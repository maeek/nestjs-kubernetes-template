FROM node:14.8.0-alpine as builder

WORKDIR /srv

COPY ./gateway ./gateway
COPY ./types ./types

RUN rm -rf gateway/node_modules types/node_modules \
  && npm --prefix gateway ci \
  && npm --prefix types ci \
  && npm --prefix gateway run build

FROM node:14.8.0-alpine

WORKDIR /srv

COPY --from=builder /srv/gateway/node_modules/ ./node_modules/
COPY --from=builder /srv/gateway/dist/ .

EXPOSE 8080

CMD node main.js
