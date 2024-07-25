.DEFAULT_GOAL:=dev

COMPOSE_ALL_FILES := -f docker-compose.yaml 

# COMPOSE_ALL_FILES := -f docker-compose.stack.yaml

BUILD_SERVICE :=  service-member-app 
include .env
export

# --------------------------
.PHONY: dev watch down build push 

dev:
	docker compose $(COMPOSE_ALL_FILES) up 

prod:
	docker compose $(COMPOSE_ALL_FILES) up -d

watch:
	docker compose -f docker-compose.yaml watch

down: ## Down stack.
	docker compose ${COMPOSE_ALL_FILES} down

build:
	docker compose ${COMPOSE_ALL_FILES} build --no-cache $(BUILD_SERVICE)

push:
	docker compose ${COMPOSE_ALL_FILES} push $(BUILD_SERVICE)