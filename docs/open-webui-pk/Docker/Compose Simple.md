# something

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