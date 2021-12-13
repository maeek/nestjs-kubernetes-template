# Boilerplate for Nest.js microservices

## Features

- Shared types
- Nest.js microservices architecture
- Kubernetes deployment
- Istio service mesh
- MongoDB - optional
- Mongo-express - optional
- Redis - optional
- RabbitMQ - optional
- Prometheus monitoring - optional

## Accessing the API and swagger docs

- Once you launch the API it will be accessible on port 8000.
- RabbitMQ management will be accessible on port 15672
- MongoDB will be accessible on port 27017
- Swagger docs for the API will be accessible locally via URI "**<http://localhost:8000/api-docs/>**"

## Brief architecture overview

- API gateway
- Example service
- The service interact via **Istio service mesh**
- MongoDB database - right now there is a single DB to store all the data
- RabbitMQ - message broker service that allow communication between services, pub/sub
- Redis - used for caching for faster and less database heavy requests, pub/sub

## Working with this template

- [Deployment with Docker](./docs/Docker.md)
- [Deployment with Kubernetes](./docs/Kubernetes.md)
