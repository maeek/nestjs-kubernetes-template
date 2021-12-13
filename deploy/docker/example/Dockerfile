# FROM node:14.8.0-alpine
# RUN npm install -g npm@6.14.7
# RUN mkdir -p /var/www/devices
# WORKDIR /var/www/devices
# ADD . /var/www/devices
# RUN npm install
# CMD npm run build && npm run start:prod
FROM node:14.8.0-alpine as builder

WORKDIR /srv

COPY ./example-service ./example-service
COPY ./types ./types

RUN rm -rf example-service/node_modules types/node_modules \
  && npm --prefix example-service ci \
  && npm --prefix types ci \
  && npm --prefix example-service run build
FROM node:14.8.0-alpine

WORKDIR /srv

COPY --from=builder /srv/example-service/node_modules/ ./node_modules/
COPY --from=builder /srv/example-service/dist/ .

CMD node main.js
