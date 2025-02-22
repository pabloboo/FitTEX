# Use a Python image with uv pre-installed
FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim as build

ARG APP_HOME="/app"
ARG VIRTUAL_ENV="/app/.venv"

# Install the project into `/app`
WORKDIR /app

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Copy from the cache instead of linking since it's a mounted volume
ENV UV_LINK_MODE=copy

# Install the project's dependencies using the lockfile and settings
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev

RUN apt-get update && apt-get install -y \
    curl \
    tar \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Place executables in the environment at the front of the path
ENV PATH=${VIRTUAL_ENV}/bin:${PATH}

RUN --mount=type=cache,target=/root/.cache/ollama \
    curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o /root/.cache/ollama/ollama-linux-amd64.tgz && \
    tar -C /usr -xzf /root/.cache/ollama/ollama-linux-amd64.tgz
