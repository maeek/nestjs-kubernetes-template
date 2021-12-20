# Boilerplate for Nest.js microservices

## Features

- Shared types
- Nest.js microservices architecture
- Kubernetes deployment
- MongoDB - optional
- Mongo-express - optional
- Redis - optional
- RabbitMQ - optional

## Accessing the API and swagger docs

- Once you launch the API it will be accessible on port 8000.
- RabbitMQ management will be accessible on port 15672
- MongoDB will be accessible on port 27017
- Swagger docs for the API will be accessible locally via URI "**<http://localhost:8000/api-docs/>**"

## Brief architecture overview

- API gateway
- Example service
- MongoDB database - right now there is a single DB to store all the data (disabled for now
- RabbitMQ - message broker service that allow communication between services, pub/sub (disabled for now
- Redis - used for caching for faster and less database heavy requests, pub/sub (disabled for now

## Working with this template

- [Building container images](./docs/Building.md)
- [Deployment with Docker](./docs/Docker.md)
- [Deployment with Kubernetes](./docs/Kubernetes.md)
