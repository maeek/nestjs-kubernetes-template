# Docker deployment

## docker-compose

### Production

To deploy production version in docker run:

```bash
# Setup variables
set -a
source config/.env

# start
make docker-compose-prod-up
# or
docker-compose -f deploy/docker/docker-compose.yml up --build

# stop
make docker-compose-prod-down
# or
docker-compose -f deploy/docker/docker-compose.yml down --remove-orphans
```

### Development

For development purposes it is possible to deploy all services with `deploy/docker/docker-compose.test.yml`. That way, when you make changes to the code, the services will be automatically restarted. This is possible because the services are running `npm run start:dev`.

> Note: If you install additional packages during development, you need to rebuild and restart the services manually to update dependencies inside the image.

```bash
# Setup variables
set -a
source config/.env

# start
make docker-compose-dev-up
# or
docker-compose -f deploy/docker/docker-compose.test.yml up --build

# stop
make docker-compose-dev-down
# or
docker-compose -f deploy/docker/docker-compose.test.yml down --remove-orphans
```
