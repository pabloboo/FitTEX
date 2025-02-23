# Primera stage: Construcción de la aplicación
FROM ghcr.io/astral-sh/uv:python3.11-bookworm-slim as build

ARG APP_HOME="/app"
ARG VIRTUAL_ENV="/app/.venv"

# Establecer directorio de trabajo
WORKDIR ${APP_HOME}

# Habilitar compilación de bytecode
ENV UV_COMPILE_BYTECODE=1

# Copiar desde caché en vez de hacer enlaces simbólicos
ENV UV_LINK_MODE=copy

# Instalar dependencias usando uv.lock
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Agregar virtualenv al PATH
ENV PATH=${VIRTUAL_ENV}/bin:${PATH}

RUN --mount=type=cache,target=/root/.cache/ollama \
    curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o /root/.cache/ollama/ollama-linux-amd64.tgz && \
    tar -C /usr -xzf /root/.cache/ollama/ollama-linux-amd64.tgz
