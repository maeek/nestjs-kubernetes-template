SHELL := /bin/bash

build-all: setup_env
	node bin/build-all.js | tee build.log

publish-all: setup_env
	docker push 

setup_env:
	set -a
	source config/.env

docker-compose-prod-up: setup_env
	docker-compose -f deploy/docker/docker-compose.yml up --build

docker-compose-dev-up: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml up --build

docker-compose-prod-down: setup_env
	docker-compose -f deploy/docker/docker-compose.yml down --remove-orphans

docker-compose-dev-down: setup_env
	docker-compose -f deploy/docker/docker-compose.test.yml down --remove-orphans

