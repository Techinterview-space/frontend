FROM node:23-alpine3.20 AS compile-image

WORKDIR /app
COPY . .
RUN npm update
RUN npm install -g @angular/cli@19.1.6
RUN npm install
RUN npm run build-prod

FROM nginx:1.25.3-alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=compile-image /app/default.conf /etc/nginx/conf.d/
COPY --from=compile-image  /app/dist/petrel.interviewer /usr/share/nginx/html
EXPOSE 80
