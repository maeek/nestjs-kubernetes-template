# Kubernetes

## 1. Building images

Before we can run the app in kubernetes cluster, we have to build and publish images to the registry.
For this purpose I will show how to setup local registry.

### 1.1. Local registry setup (optional)

#### 1.1.1. docker-compose method

Run registry with docker-compose to never search for a `docker run` command again. You can use the provided example `deploy/docker/registry-docker-compose.yml`.

Change your credentials, default is `user`:`mysecurepassword`

```bash
docker run --entrypoint htpasswd httpd:2 -Bbn user mysecurepassword  > config/htpasswd

docker-compose -f deploy/docker/registry-docker-compose.yml up -d
```

#### 1.1.2. docker run method

Run registry with `docker run` command.

```bash
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  --hostname registry \
  -v "$(pwd)"/config/httpaswd:/auth/htpasswd \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -v "$(pwd)"/deploy/docker/local-registry:/data \
  registry:2
```

#### 1.1.3. Accessing registry

Firts you have to login to the registry.

```bash
docker login -u user localhost:5000 # password is mysecurepassword
```

Testing publishin images to the registry.

```bash
# Tag and push images to the registry
docker pull node:14.8.0-alpine
docker tag node:14.8.0-alpine localhost:5000/node:14.8.0-alpine
docker push localhost:5000/node:14.8.0-alpine

# Remove image from hub.docker.io
docker image remove node:14.8.0-alpine
docker image remove localhost:5000/node:14.8.0-alpine

# Pull the image from local registry
docker pull localhost:5000/node:14.8.0-alpine

```

If all commands ran successfully, you should see the following output:

```
14.8.0-alpine: Pulling from node
Digest: sha256:xxxxxxxxxxxxxxx
Status: Downloaded newer image for localhost:5000/node:14.8.0-alpine
localhost:5000/node:14.8.0-alpine
```

### 1.2. Building images for all services

#### 1.2.1. Build a single image - process

You can build a single image with `docker build` command (running it from the root path).

```bash
docker build -t localhost:5000/gateway-service \
  -f deploy/docker/Dockerfile \
  --build-arg servicename="gateway" \
  production/

# Push new image to the registry
docker push localhost:5000/gateway-service
```

Change build-arg servicename to the folder name of the service you want to build (e.g. example-service).

#### 1.2.2. Build all images

To build images for all services, run `make build-all` command.
