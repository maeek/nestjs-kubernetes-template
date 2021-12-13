# Docker deployment

## docker-compose

### Production

To deploy production version in docker run:

```bash
# Setup variables
set -a
source config/.env

# start
docker-compose -f deploy/docker/docker-compose.yml up --build

# stop
docker-compose -f deploy/docker/docker-compose.yml down --remove-orphans
```

### Development

For development purposes it is possible to deploy all services with `deploy/docker/docker-compose.test.yml`

```bash
# Setup variables
set -a
source config/.env

# start
docker-compose -f deploy/docker/docker-compose.test.yml up --build

# stop
docker-compose -f deploy/docker/docker-compose.test.yml down --remove-orphans
```
