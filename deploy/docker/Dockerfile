FROM node:14.8.0-alpine as builder

ARG servicename

RUN echo "Building service: $servicename"

WORKDIR /srv

COPY ./${servicename} ./${servicename}
COPY ./types ./types

RUN echo ${servicename} && rm -rf ${servicename}/node_modules types/node_modules \
  && npm --prefix ${servicename} ci \
  && npm --prefix types ci \
  && npm --prefix ${servicename} run build

FROM node:14.8.0-alpine

ARG servicename

WORKDIR /srv

COPY --from=builder /srv/${servicename}/node_modules/ ./node_modules/
COPY --from=builder /srv/${servicename}/dist/ .

EXPOSE 8080

CMD node main.js
