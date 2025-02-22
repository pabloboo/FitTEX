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
        --privileged \
        --gpus all \
        --network host \
        $(PROJECT_NAME) bash

--run: --build
	docker run --rm \
		--name $(PROJECT_NAME)-container \
		$(PROJECT_NAME)

build: --build
shell: --build --user-shell
notebook/run: --notebook-run


--notebook: CMD = jupyter server \
					--ServerApp.ip=0.0.0.0 \
					--ServerApp.root_dir=/home/${HOST_USER} \
					--ServerApp.token='fittex'

--notebook-run: --notebook --user-shell
