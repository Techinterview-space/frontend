FROM node:23.8-alpine3.20 AS compile-image

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build-prod

# Production image with Node.js for SSR
FROM node:23.8-alpine3.20 AS production

WORKDIR /app

# Copy built application (both browser and server)
COPY --from=compile-image /app/dist/interviewer ./dist/interviewer

# Copy package files for production dependencies
COPY --from=compile-image /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# SSR server runs on port 4000
EXPOSE 4000

# Run the Angular SSR server
CMD ["node", "dist/interviewer/server/server.mjs"]
