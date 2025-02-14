FROM node:23.8-alpine3.20 AS compile-image

WORKDIR /app
COPY . .
RUN npm update
RUN npm install -g @angular/cli@19.1.6
RUN npm install
RUN npm run build-prod

FROM nginx:1.27.4-alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=compile-image /app/default.conf /etc/nginx/conf.d/
COPY --from=compile-image  /app/dist/interviewer /usr/share/nginx/html
EXPOSE 80
