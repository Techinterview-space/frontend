# TechInterview.space

Frontend part of the [Techinterview.space](https://techinterview.space)

## Tech stack

- Angular 20
- Angular SSR (Server-Side Rendering)
- Express.js (SSR server)
- Docker

## How to run locally

### Development (SPA mode)

```sh
npm install
npm start
```

Opens at `http://localhost:4200`

### With SSR

```sh
npm install
npm run build
npm run serve:ssr:interviewer
```

Opens at `http://localhost:4000`

## Docker

```sh
# Build
docker build -t techinterview-frontend .

# Run
docker run -p 8080:4000 techinterview-frontend
```

Opens at `http://localhost:8080`

## Documentation

- [SSR & Deployment Guide](docs/SSR_DEPLOYMENT.md) - Detailed SSR implementation and deployment documentation
