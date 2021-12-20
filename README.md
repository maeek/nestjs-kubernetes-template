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
- Swagger docs for the API will be accessible locally via URI "**<http://localhost:8080/api-docs/>**"

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

## Folder structure

```txt
.
├── config                       # Config files for building and running docker images
│   ├── .env.example             # .env file for docker-compose
│   └── config.js                # Config file for building images
├── deploy                       # Deployment files - Docker and k8s
│   ├── docker                   # Docker files to build images and run containers locally
│   └── k8s                      # Kubernetes deployment files
|       └── services             # Deployment files for services
├── docs                         # Documentation files for this template
├── production                   # Source files for services
│   ├── gateway                  # API gateway service
│   ├── example                  # Example implementation of a service
|   |   ├── dist                 # Built service
|   |   ├── node_modules         # node_modules for the service
|   |   ├── package.json         # package.json for the service
|   |   └── src                  # Source code files for the example service
|   |       ├── interfaces       # Local service interfaces
|   |       ├── schemas          # Mongoose schemas for the service
|   |       ├── services         # Services
|   |       ├── controller.ts    # Service controller
|   |       └── main.ts          # Service entrypoint
│   └── types                    # Shared Types
|       └── src                  # Source code files for the shared types
├── tools                        # Tools and utilities
├── makefile
├── LICENSE
└── README.md
```
