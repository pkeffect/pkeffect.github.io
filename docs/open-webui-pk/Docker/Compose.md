# Docker Compose

 * Main interface I use for LLM interaction and more is OpenWebUI
 * The compose files listed below assume the following:
 * Ollama is installed locally, not in docker
 * Volumes are stored/mounted local (directory), not in docker
 * Rename example.env to .env and edit as needed. See [OpenWebUI Env Options](https://docs.openwebui.com/getting-started/env-configuration) for more information
 * This is the most efficient setup for my system. Your mileage may vary
 * Windows 11 | [Docker Desktop](https://www.docker.com/products/docker-desktop/) | [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) - [24.10 (Oracular Oriole)](https://ubuntu.com/)
 * AMD Ryzen 9 3900XT | 128GB DDR4 RAM | ASUS TUF RTX 3080 GAMING OC 10GB

# Simplified Compose
```
services:
  open-webui-dev-cuda:
    image: ghcr.io/open-webui/open-webui:dev-cuda
    container_name: open-webui-dev-cuda
    stdin_open: true
    tty: true    
    ports:
      - "3999:8080"
    volumes: #locally mounted directory
      - ./data:/app/backend/data
    deploy: # gpu support
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities:
                - gpu      
    env_file: .env      
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
    expose:
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
