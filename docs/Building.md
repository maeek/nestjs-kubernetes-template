# Building

This document covers all the steps to build and publish images to the registry.

## Prerequisites

- docker
- nodejs

## Config

Before you build your first image, you need to setup the configuration in `config/config.js` file.

### Config options

| Name                | Description                                                           | Default                     |
| ------------------- | --------------------------------------------------------------------- | --------------------------- |
| mode                | `production` or `development`                                         | `production`                |
| basePath            | The base path of the application, it's best to not modify this option | `<rootPath>`                |
| registryUrl         | The registry url                                                      | `http://localhost:5000`     |
| servicesPath        | The path of the services folder                                       | `production`                |
| imgPrefix           | The prefix of the image name                                          |                             |
| excludeFolders      | Folders in `servicesPath` that should be excluded from the build      | `['node_modules', 'types']` |
| customServiceConfig | Custom service config file to override default build config           | `docker-build.config.js`    |
| dockerPath          | The path of the docker folder                                         | `docker`                    |

### `customServiceConfig` file

This let's you to override the default build config for each service. You can also specify `dockerBuildOptions` option in package.json. This config is directly consumed by `tools/lib/Builder.js` file.

| Name           | Description                                                                      | Default                                                              |
| -------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| dockerfilePath | The path of the dockerfile, it can be relative to the service folder or absolute | `Dockerfile`                                                         |
| registryUrl    | The registry url                                                                 | `<registryUrl>`                                                      |
| imgPrefix      | The prefix of the image name                                                     | `<imgPrefix>`                                                        |
| cwd            | The current working directory                                                    | `<servicePath>`                                                      |
| bin            | The path of the binary that will be executed to build the image                  | `<dockerPath>`                                                       |
| tag            | The tag of the image                                                             | By default it consists of `${registryUrl}${imgPrefix}${serviceName}` |
| buildArgs      | Additional build args for docker, format should be `['KEY=value']`               | `[]`                                                                 |
| environment    | Custom environment variables, format should be `['KEY=value']`                   | `[]`                                                                 |

## Building images

### Building command

You can use this command to build single image.

```bash
docker build -t <serviceName> \
  -f deploy/docker/Dockerfile \
  --build-arg NODE_VERSION=14.8.0-alpine \
  --build-arg SERVICE_NAME=<serviceName> \
  production/
```

### Building all images

To build all services, run `make build-all` command from project root.

## Publishing to a registry

### Registry setup (optional)

> Note: This is a short guide, please refer to the official documentation for more details. If you're using minikube this can be optional, because you can load images to the cluster with `minikube image load <imgTag>`, for more information check [minikube local registry](https://minikube.sigs.k8s.io/docs/handbook/registry/), or setup a registry that you can access from minikube. For deploying private docker registry check [official documentation](https://docs.docker.com/registry/deploying/)

### Accessing registry

Firts you have to login to the registry.

```bash
docker login -u myuser <registry-url>
# It will prompt you for your password
```

Testing publishing images to the registry.

```bash
# Tag and push images to the registry
docker pull node:14.8.0-alpine
docker tag node:14.8.0-alpine <registry-url>/node:14.8.0-alpine
docker push <registry-url>/node:14.8.0-alpine

# Remove local images
docker image remove node:14.8.0-alpine
docker image remove <registry-url>/node:14.8.0-alpine

# Pull the image from local registry
docker pull <registry-url>/node:14.8.0-alpine

```

If all commands ran successfully, you should see the following output:

```txt
14.8.0-alpine: Pulling from node
Digest: sha256:xxxxxxxxxxxxxxx
Status: Downloaded newer image for <registry-url>/node:14.8.0-alpine
<registry-url>/node:14.8.0-alpine
```

Now you can build and publish images to the registry.
