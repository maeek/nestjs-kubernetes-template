ARG NODE_VERSION=14.8.0-alpine

# Builder image
FROM node:${NODE_VERSION} as builder

ARG SERVICE_NAME
ENV NODE_ENV=production

WORKDIR /usr/app

COPY ./${SERVICE_NAME} ./${SERVICE_NAME}
COPY ./types ./types

RUN echo ${SERVICE_NAME} && rm -rf ${SERVICE_NAME}/node_modules types/node_modules \
  && npm --prefix ${SERVICE_NAME} ci \
  && npm --prefix types ci \
  && npm --prefix ${SERVICE_NAME} run build

# Runtime image
FROM node:${NODE_VERSION} as production

ARG SERVICE_NAME
ENV NODE_ENV=production

WORKDIR /usr/app

COPY --from=builder /usr/app/${SERVICE_NAME}/node_modules/ ./node_modules/
COPY --from=builder /usr/app/${SERVICE_NAME}/dist/ .

EXPOSE 8080

CMD node main.js
