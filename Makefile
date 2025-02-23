SHELL := /bin/bash
PROJECT_NAME ?= fittex
HOST_USER ?= $(shell whoami)
DATA_PATH ?= $(shell pwd)/data

.PHONY: build shell notebook

# Build the Docker image
build:
	docker build \
		-t $(PROJECT_NAME) \
		-f devops/Dockerfile \
		.

# Run an interactive shell in the container
shell: build
	docker run --rm -it \
		-e HOME=/home/$(HOST_USER) \
		--name $(PROJECT_NAME)-container \
		-v $(shell pwd):/opt/project \
		-v $(DATA_PATH):/data \
		--privileged \
		--network host \
		$(PROJECT_NAME) bash

# Run the container (non-interactive)
run: build
	docker run --rm \
		--name $(PROJECT_NAME)-container \
		$(PROJECT_NAME)

# Run a Jupyter notebook server in the container
notebook: build
	docker run --rm -it \
		-e HOME=/home/$(HOST_USER) \
		--name $(PROJECT_NAME)-notebook \
		-v $(shell pwd):/opt/project \
		-v $(DATA_PATH):/data \
		--privileged \
		--network host \
		-p 8888:8888 \
		$(PROJECT_NAME) \
		jupyter server \
			--ServerApp.ip=0.0.0.0 \
			--ServerApp.root_dir=/home/$(HOST_USER) \
			--ServerApp.token='fittex'