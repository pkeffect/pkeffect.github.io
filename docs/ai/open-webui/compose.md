---
sidebar_position: 3
---
# OpenWebUI Compose

 * Main interface I use for LLM interaction and more is OpenWebUI
 * The compose files listed below assume the following:
 * Ollama is installed locally, not in docker
 * Volumes are stored/mounted local (directory), not in docker volumes
 * Rename example.env to .env and edit as needed. See [OpenWebUI Env Options](https://docs.openwebui.com/getting-started/env-configuration) for more information


## Simplified Compose
```
services:
  open-webui-dev-cuda:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui-dev-cuda
    stdin_open: true
    tty: true    
    ports:
      - "3000:8080"
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3" 
    volumes: #locally mounted directory
      - ./data:/app/backend/data
    environment:
      - 'SAFE_MODE=${SAFE_MODE}'    
      - 'SCARF_NO_ANALYTICS=${SCARF_NO_ANALYTICS}'
      - 'DO_NOT_TRACK=${DO_NOT_TRACK}'
      - 'ANONYMIZED_TELEMETRY=${ANONYMIZED_TELEMETRY}'
      - 'OLLAMA_BASE_URL=${OLLAMA_BASE_URL}'
      - 'WEBUI_SECRET_KEY=${WEBUI_SECRET_KEY}'
      - 'USE_CUDA_DOCKER=${USE_CUDA_DOCKER}'
      - 'ENV=${ENV}'
      - 'USER_AGENT=${USER_AGENT}'
      - 'WEBUI_URL=${WEBUI_URL}'
    extra_hosts:
      - "host.docker.internal:host-gateway"      
    restart: unless-stopped
    networks:
      - "hyperspace" #change or not
networks:
  hyperspace: #change or not
    external: true
```

## Complex Compose
```
services:
  nginx-proxy:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx-reverse-proxy
    restart: always
    ports:
      - '80:80' # Public HTTP Port
      - '443:443' # Public HTTPS Port
      - '81:81' # Admin Web Port
    volumes: # The volumes below are mounted to host
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - "hyperspace"

#  ollama:
#    volumes:
#      - H:/ai/.ollama:/root/.ollama
#    container_name: ollama
#    pull_policy: always
#    tty: true
#    restart: unless-stopped
#    image: ollama/ollama:latest
#### GPU support
#    deploy:
#      resources:
#        reservations:
#          devices:
#            - driver: nvidia
#              count: 1
#              capabilities:
#                - gpu
#    networks:
#      - "hyperspace"
      
  open-webui-dev-cuda:
    image: ghcr.io/open-webui/open-webui:dev-cuda
    container_name: open-webui-dev-cuda
    stdin_open: true
    tty: true
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"     
    ports:
      - "3000:8080"
    volumes:
      - ./.data-open-webui:/app/backend/data
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities:
                - gpu      
    extra_hosts:
      - "host.docker.internal:host-gateway"     
    environment:
      - 'SCARF_NO_ANALYTICS=${SCARF_NO_ANALYTICS}'
      - 'DO_NOT_TRACK=${DO_NOT_TRACK}'
      - 'ANONYMIZED_TELEMETRY=${ANONYMIZED_TELEMETRY}'
      - 'OLLAMA_BASE_URL=${OLLAMA_BASE_URL}'
      - 'WEBUI_SECRET_KEY=${WEBUI_SECRET_KEY}'
      - 'USE_CUDA_DOCKER=${USE_CUDA_DOCKER}'
      - 'COMFYUI_BASE_URL=${COMFYUI_BASE_URL}'
      - 'AUTOMATIC1111_BASE_URL=${AUTOMATIC1111_BASE_URL}'
      - 'TEXT_EXTRACTION_ENGINE=${TEXT_EXTRACTION_ENGINE}'
      - 'ENV=${ENV}'
      - 'USER_AGENT=${USER_AGENT}'
      - 'WEBUI_URL=${WEBUI_URL}'
      - 'GLOBAL_LOG_LEVEL=${GLOBAL_LOG_LEVEL}'
      - 'SAFE_MODE=${SAFE_MODE}'
    restart: always
    networks:
      - "hyperspace"

  tika:
    image: apache/tika:latest-full
    container_name: open-webui-tika
    ports:
      - "9998:9998"
    depends_on:
      - open-webui-dev-cuda       
    networks:
      - "hyperspace"
    restart: unless-stopped
    
  searxng:
    image: searxng/searxng:latest
    container_name: open-webui-searxng
    ports:
      - "4000:8080"      
    volumes:
      - ./.data-searxng:/etc/searxng:rw
    depends_on:
      - open-webui-dev-cuda       
    restart: always  
    networks:
      - "hyperspace"

  # OpenAPI Tool Servers using local directories
  openapi-filesystem:
    image: python:3.11-slim
    container_name: openapi-filesystem
    volumes:
      - ./openapi-filesystem-data:/app/data
      - ./openapi-servers/servers/filesystem:/app
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
    command: >
      bash -c "
        apt-get update && apt-get install -y git curl && apt-get clean &&
        cd /app && 
        pip install --no-cache-dir -r requirements.txt &&
        uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
      "
    restart: unless-stopped
    networks:
      - "hyperspace"
      
  openapi-git:
    image: python:3.11-slim
    container_name: openapi-git
    volumes:
      - ./openapi-git-data:/app/data
      - ./openapi-servers/servers/git:/app
    ports:
      - "8001:8001"
    environment:
      - PORT=8001
    command: >
      bash -c "
        apt-get update && 
        apt-get install -y git-core git-lfs curl && 
        apt-get clean &&
        cd /app && 
        pip install --no-cache-dir -r requirements.txt &&
        pip install GitPython &&
        uvicorn main:app --host 0.0.0.0 --port ${PORT:-8001}
      "
    restart: unless-stopped
    networks:
      - "hyperspace"
      
  openapi-memory:
    image: python:3.11-slim
    container_name: openapi-memory
    volumes:
      - ./openapi-memory-data:/app/data
      - ./openapi-servers/servers/memory:/app
    ports:
      - "8002:8002"
    environment:
      - PORT=8002
    command: >
      bash -c "
        apt-get update && apt-get install -y git curl && apt-get clean &&
        cd /app && 
        pip install --no-cache-dir -r requirements.txt &&
        uvicorn main:app --host 0.0.0.0 --port ${PORT:-8002}
      "
    restart: unless-stopped
    networks:
      - "hyperspace"
      
  openapi-time:
    image: python:3.11-slim
    container_name: openapi-time
    volumes:
      - ./openapi-time-data:/app/data
      - ./openapi-servers/servers/time:/app
    ports:
      - "8003:8003"
    environment:
      - PORT=8003
    command: >
      bash -c "
        apt-get update && apt-get install -y git curl && apt-get clean &&
        cd /app && 
        pip install --no-cache-dir -r requirements.txt &&
        uvicorn main:app --host 0.0.0.0 --port ${PORT:-8003}
      "
    restart: unless-stopped
    networks:
      - "hyperspace"
      
      
  pipelines:
    image: ghcr.io/open-webui/pipelines:main 
    container_name: open-webui-pipelines
    ports:
      - "9099:9099"
    environment:
      - 'RESET_PIPELINES_DIR=${RESET_PIPELINES_DIR}'
      - 'PIPELINES_URLS=${PIPELINES_URLS}'	  
#     - 'PIPELINES_REQUIREMENTS_PATH=${PIPELINES_REQUIREMENTS_PATH}'
#     - 'ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}'
#     - 'COHERE_API_KEY=${COHERE_API_KEY}'
#     - 'GOOGLE_API_KEY=${GOOGLE_API_KEY}'
    volumes:
      - ./.data-pipelines:/app/pipelines
    depends_on:
      - open-webui-dev-cuda    
    restart: always
    networks:
      - "hyperspace"
  jupyter:
    image: jupyter/datascience-notebook
    container_name: jupyter
    ports:
      - "8889:8888"
    volumes:
      - notebook:/home/jovyan/work
    environment:
      - JUPYTER_TOKEN=somethinghere
      - JUPYTER_ENABLE_TOKEN=yes
    restart: always

  openedai-speech:
    image: ghcr.io/matatonic/openedai-speech:latest
    container_name: open-webui-openedai-speech
    ports:
      - "8000:8000"
    volumes:
      - ./.data-openedai-speech/voices:/app/voices
      - ./.data-openedai-speech/config:/app/config
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities:
                - gpu
    depends_on:
      - open-webui-dev-cuda
    networks:
      - "hyperspace"

  chromadb:
    image: docker.io/chromadb/chroma:latest
    container_name: open-webui-chromadb
    environment:
      - 'ALLOW_RESET=${ALLOW_RESET}'
      - 'ANONYMIZED_TELEMETRY=${ANONYMIZED_TELEMETRY}'
      - 'CHROMA_ROOT_PASSWORD=${CHROMA_ROOT_PASSWORD}'
      - 'CHROMA_DATABASE=${CHROMA_DATABASE}'
      - 'CHROMA_HTTP_HOST=${CHROMA_HTTP_HOST}'
    ports:
      - "3308:3306"
    volumes:
      - ./.data-chroma:/chroma/chroma
      - ./.data-chroma:/app/data
    depends_on:
      - open-webui-dev-cuda
    restart: always   
    networks:
      - "hyperspace"
      
  postgres:
    container_name: open-webui-postgres
    image: docker.io/postgres:latest
    environment: 
      - 'POSTGRES_PASSWORD=${POSTGRES_PASSWORD}'
      - 'POSTGRES_PORT=${POSTGRES_PORT}'
      - 'POSTGRES_DB=${POSTGRES_DATABASE}'
      - 'POSTGRES_USER=${POSTGRES_USER}'
    ports: 
      - "5333:5432"
    volumes:
      - ./.data-postgres:/var/lib/postgresql/data
    depends_on:
      - open-webui-dev-cuda
    restart: unless-stopped
    networks:
      - "hyperspace"

  prometheus:
    image: bitnami/prometheus:latest
    container_name: open-webui-prometheus
    ports:
      - 9090:9090
    command:
      - '--config.file=/etc/prometheus/prometheus.yaml'
    volumes:
      - ./.data-prometheus/config/prometheus.yaml:/etc/prometheus/prometheus.yaml:ro
      - ./.data-prometheus/data:/prometheus
    restart: unless-stopped
    networks:
      - "hyperspace"
  
  grafana:
    image: grafana/grafana
    container_name: open-webui-grafana
    ports:
      - '3333:3000'
    volumes:
      - ./.data-grafana:/var/lib/grafana
    restart: unless-stopped
#   password: root1234567890
    networks:
      - "hyperspace"
  
  node_exporter:
    image: quboleinc/node_exporter
    container_name: open-webui-node_exporter
    pid: host
    ports:
      - '9100:9100'
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.rootfs=/host'
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    networks:
      - "hyperspace"
      
  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    container_name: open-webui-cadvisor
    command:
      - '-port=8098'
    ports:
      - '8098:8098'    
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    devices:
      - /dev/kmsg
    privileged: true
    restart: unless-stopped
    networks:
      - "hyperspace" 
networks:
  hyperspace:
    external: true
```
