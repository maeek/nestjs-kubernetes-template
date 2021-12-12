FROM node:14.8.0-alpine

RUN mkdir -p /app

WORKDIR /app

VOLUME [ "/app" ]

RUN npm ci

EXPOSE 8080

CMD npm run build && npm run start:prod
