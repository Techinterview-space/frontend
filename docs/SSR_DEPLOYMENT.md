# Angular SSR (Server-Side Rendering) Implementation

This document describes the SSR implementation for the Techinterview.space frontend application.

## Overview

The application uses Angular's built-in SSR support (`@angular/ssr`) to enable server-side rendering for improved SEO and social media sharing (meta tags).

### Why SSR?

- **SEO**: Search engines can crawl pre-rendered HTML content
- **Social Sharing**: Meta tags (Open Graph, Twitter Cards) are rendered on the server, enabling rich previews when sharing links
- **Faster First Contentful Paint**: Users see content faster as HTML is pre-rendered

## Architecture

### Hybrid SSR/SPA Approach

Not all pages need SSR. The application uses a hybrid approach:

| Page Type | Render Mode | Reason |
|-----------|-------------|--------|
| Home (`/`) | Server | SEO |
| Companies (`/companies`, `/companies/:id`) | Server | Meta tags for social sharing |
| Salaries (`/salaries/**`) | Client | Complex charts, better as SPA |
| Auth pages (`/auth-callback`, `/logout-callback`) | Client | Uses browser APIs |
| Admin pages (`/admin/**`) | Client | Authenticated, no SEO needed |
| User pages (`/me/**`, `/users/**`) | Client | Authenticated |
| Interviews (`/interviews/**`) | Client | Authenticated |

Configuration is in `src/app/app.routes.server.ts`.

## Key Files

```
src/
├── server.ts                    # Express.js SSR server
├── main.server.ts               # Server-side Angular bootstrap
├── ssr-polyfills.ts             # Browser API mocks for SSR
├── app/
│   ├── app.module.ts            # Main module with hydration config
│   ├── app.module.server.ts     # Server-specific module
│   ├── app.routes.server.ts     # SSR/SPA route configuration
│   └── services/
│       └── meta-tags.service.ts # Dynamic meta tag management
```

## Local Development

### Running with SSR

```bash
# Build the application (includes SSR)
npm run build

# Start the SSR server
npm run serve:ssr:interviewer
# or directly:
node dist/interviewer/server/server.mjs
```

The server runs on `http://localhost:4000` by default.

### Running without SSR (Development)

```bash
npm start
# or
ng serve
```

This runs the standard Angular dev server on `http://localhost:4200`.

## Docker Deployment

### Dockerfile Overview

The Dockerfile uses a multi-stage build:

1. **Build Stage** (`compile-image`):
   - Installs dependencies
   - Builds the production Angular app with SSR

2. **Production Stage** (`production`):
   - Lightweight Node.js Alpine image
   - Contains only production dependencies
   - Runs the Express.js SSR server

### Building the Docker Image

```bash
docker build -t techinterview-frontend .
```

### Running the Container

```bash
docker run -p 8080:4000 techinterview-frontend
```

Access the application at `http://localhost:8080`.

### Docker Compose

```yaml
services:
  frontend:
    container_name: frontend
    image: your-registry/frontend:tag
    restart: always
    ports:
      - 8080:4000
    environment:
      - NODE_ENV=production
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4000` | SSR server port |
| `NODE_ENV` | - | Set to `production` for production builds |

## Dynamic Meta Tags

### How It Works

1. **Resolver** fetches data before component loads
2. **MetaTagService** updates meta tags during SSR
3. **HTTP Transfer Cache** ensures data is available on both server and client

### Example: Company Page

```typescript
// Route configuration with resolver
{
  path: ':id',
  component: CompanyPageComponent,
  resolve: { companyData: companyResolver },
}

// Component uses MetaTagService
this.metaTagService.setCompanyMetaTags({
  companyName: company.name,
  rating: company.rating,
  reviewsCount: company.reviewsCount,
  slug: company.slug,
});
```

### Adding Meta Tags to New Pages

1. Create a resolver to fetch data:

```typescript
export const myResolver: ResolveFn<MyData> = (route) => {
  const service = inject(MyService);
  return service.getData(route.paramMap.get('id'));
};
```

2. Add resolver to route:

```typescript
{ path: 'my-page/:id', component: MyComponent, resolve: { data: myResolver } }
```

3. Update meta tags in component:

```typescript
ngOnInit() {
  this.route.data.subscribe(({ data }) => {
    this.metaTagService.updateMyPageMetaTags(data);
  });
}
```

4. Configure SSR in `app.routes.server.ts`:

```typescript
{ path: 'my-page/:id', renderMode: RenderMode.Server }
```

## Browser API Mocking

Some libraries use browser APIs that don't exist on the server. These are mocked in `src/ssr-polyfills.ts`:

- `window`
- `document`
- `localStorage` / `sessionStorage`
- `navigator`
- `crypto`

### Auth0 SSR Compatibility

Auth0's SDK uses browser APIs. A mock service (`Auth0ServerMockService`) is provided for SSR:

```typescript
// app.module.server.ts
providers: [
  { provide: AuthService, useClass: Auth0ServerMockService },
]
```

## Troubleshooting

### Meta tags not updating

1. Verify the route uses `RenderMode.Server` in `app.routes.server.ts`
2. Ensure the resolver is completing successfully
3. Check that `withHttpTransferCacheOptions()` is configured in `app.module.ts`

### "location is not defined" error

Browser APIs are being accessed during SSR. Solutions:
- Add platform check: `if (isPlatformBrowser(this.platformId))`
- Add mock to `ssr-polyfills.ts`

### Data loading twice (server + client)

This is expected with HTTP Transfer Cache. The server fetches data and transfers it to the client via `<script>` tags in the HTML.

### SSR server crashes on startup

Check for:
- Missing browser API mocks
- Auth0 initialization issues (should only initialize in browser)
- Missing dependencies in production build

## Testing SSR Output

Verify meta tags are rendered:

```bash
# Start the server
node dist/interviewer/server/server.mjs &

# Check meta tags
curl -s http://localhost:4000/companies/your-company-slug | grep -E '<meta|<title>'
```

## CI/CD Pipeline

The GitHub Actions workflow (`deploy.yml`):

1. Builds Docker image with SSR support
2. Pushes to DigitalOcean Container Registry
3. Deploys via SSH using docker-compose

No changes needed to the workflow - the Dockerfile handles SSR configuration.

## Performance Considerations

- **Caching**: Static assets are cached for 1 year (`maxAge: '1y'`)
- **Client pages**: Routes configured as `RenderMode.Client` skip SSR entirely
- **HTTP caching**: Consider adding a CDN or reverse proxy for production

## Future Improvements

- [ ] Add PM2 for process management and auto-restart
- [ ] Add health check endpoint (`/health`)
- [ ] Configure nginx reverse proxy for SSL termination
- [ ] Add Redis for SSR response caching

