FROM node:17-alpine3.14 AS compile-image

WORKDIR /app
COPY . .
RUN npm update
RUN npm install -g @angular/cli@13.2.3
RUN npm install
RUN npm run build-prod

FROM nginx:1.17-alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=compile-image /app/default.conf /etc/nginx/conf.d/
COPY --from=compile-image  /app/dist/petrel.interviewer /usr/share/nginx/html
EXPOSE 80
