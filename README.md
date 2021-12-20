# Template for Nest.js microservices

## Features

- [x] Shared types
- [x] Nest.js microservices architecture
- [x] Kubernetes deployment
- [x] MongoDB - optional
- [x] Mongo-express - optional
- [x] Redis - optional
- [x] RabbitMQ - optional

## Accessing the API and swagger docs

- Once you launch the API it will be accessible on port 8080.
- RabbitMQ management will be accessible on port 15672
- MongoDB will be accessible on port 27017
- Swagger docs for the API will be accessible locally via URI "**<http://localhost:8080/api-docs/>**"

## Brief architecture overview

- [x] API gateway
- [x] Example service
- [ ] MongoDB database - right now there is a single DB to store all the data
- [ ] RabbitMQ - message broker service that allow communication between services, pub/sub
- [ ] Redis - used for caching for faster and less database heavy requests, pub/sub

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
|       └── index.d.ts           # Types entrypoint
|       └── src                  # Source code files for the shared types
├── tools                        # Tools and utilities
├── makefile
├── LICENSE
└── README.md
```
