SHELL:=/bin/bash
PROJECT_NAME?=fittex
HOST_USER?=$(shell whoami)
DATA_PATH?=$(shell pwd)/data

--build:
	docker build \
		-t $(PROJECT_NAME) \
		-f devops/Dockerfile \
		.

--user-shell: --build
	docker run --rm -it \
        -e HOME=/home/$(HOST_USER) \
        --name $(PROJECT_NAME)-container \
        -v $(shell pwd):/opt/project \
        -v $(DATA_PATH):/data \
        $(PROJECT_NAME) \
        bash

--run: --build
	docker run --rm \
		--name $(PROJECT_NAME)-container \
		$(PROJECT_NAME)

build: --set-dev --build
shell: --build --user-shell
