# OpenWebUI Cheat Sheet
 * Main interface I use for LLM interaction and more is OpenWebUI
   
![alt text](https://github.com/pkeffect/AI/blob/main/images/llm.app.learning.curve.small.png "llm app learning curve")

* The compose files listed above assume the following:
  * Ollama is installed locally, not in docker
  * Volumes are stored/mounted local (directory), not in docker
* Rename example.env to .env and edit as needed. See [OpenWebUI Env Options](https://docs.openwebui.com/getting-started/advanced-topics/env-configuration) for more information
* This is the most efficient setup for my system. Your mileage may vary
  * Windows 11 | [Docker Desktop](https://www.docker.com/products/docker-desktop/) | [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) - [24.10 (Oracular Oriole)](https://ubuntu.com/)
  * AMD Ryzen 9 3900XT | 128GB DDR4 RAM | ASUS TUF RTX 3080 GAMING OC 10GB

## OPENWEBUI
| SITE | ADDRESS |
| ------------- | ------------- |
| Community | https://openwebui.com/ |
| Github | https://github.com/open-webui/open-webui |
| Documentation | https://docs.openwebui.com/ |
| Changelog | https://github.com/open-webui/open-webui/blob/e9d6ada25cd6ce84be067ba794af4c9d7116edc7/CHANGELOG.md |
| Documentation Archive | https://github.com/open-webui/docs/archive/refs/heads/main.zip |
| Discord | https://discord.com/invite/5rJgQTnV4s |
| Reddit | https://www.reddit.com/r/OpenWebUI/ |

## DOCKER IMAGE DOWNLOADS
 - [OpenWebUI Docker Images](https://github.com/open-webui/open-webui/pkgs/container/open-webui/versions?filters%5Bversion_type%5D=tagged)

| IMAGE | BRANCH |
| ------------- | ------------- |
| ```docker pull ghcr.io/open-webui/open-webui:main``` | Main |
| ```docker pull ghcr.io/open-webui/open-webui:cuda``` | Nvidia CUDA |
| ```docker pull ghcr.io/open-webui/open-webui:ollama``` | Ollama bundle |
| ```docker pull ghcr.io/open-webui/open-webui:dev``` | (Main) development |
| ```docker pull ghcr.io/open-webui/open-webui:dev-cuda``` | Nvidia CUDA development |
| ```docker pull ghcr.io/open-webui/open-webui:dev-ollama``` | Ollama bundle development |
 * I use [Watchtower](https://github.com/containrrr/watchtower) in docker to keep all images updated automatically

## ADDRESSES
If installed, Ollama should be listening on 0.0.0.0 and port 11434 by default
| ADDRESS | DESCRIPTION |
| ------------- | ------------- |
| ```http://localhost:11434``` | Local (host) Machine |
| ```http://127.0.0.1:11434``` | Local (host) Machine | 
| ```http://192.168.xxx.xxx:11434``` | Local (host) Machine |
| ```http://ollama:11434``` | Local (host) Machine | 
| ```http://host.docker.internal:11434``` | Internal Docker |
| ```http://172.xxx.xxx.xxx:11434``` | Internal Docker |
 * I use [Nginx Proxy Manager](https://nginxproxymanager.com/guide/) in docker for websocket and proxying/SSL certification control

## OWUI PROMPT VARIABLES 
| VAR | DESCRIPTION |
| ------------- | ------------- |
| ```{{CLIPBOARD}}``` | Contents of your current clipboard |
| ```{{USER_NAME}}``` | Your name |
| ```{{USER_LOCATION}}``` | Your location |
| ```{{USER_LANGUAGE}}``` | Your language |
| ```{{CURRENT_DATE}}``` | Current date |
| ```{{CURRENT_TIME}}``` | Current time |
| ```{{CURRENT_DATETIME}}``` | Current date and time |
| ```{{CURRENT_TIMEZONE}}``` | Your timezone |
| ```{{CURRENT_WEEKDAY}}``` | Current weekday |
 
## DEVELOPMENT
 * To edit OpenWebUI, you must first set up a development environment
 * See [Advanced Topics - Development](https://docs.openwebui.com/getting-started/advanced-topics/development)
 * Then [fork](https://github.com/open-webui/open-webui/fork) the repo 
 * Make any edits you need to the code
 * Rebuild your project image
 * Deploy new image
 * These edits need to be made each time you update OpenWebUI as they will be overwritten

## OLLAMA
| SITE | ADDRESS |
| ------------- | ------------- |
| Ollama | https://ollama.com/ |
| Github | https://github.com/ollama/ollama |
| Download | https://ollama.com/download |
| Documentation | https://github.com/ollama/ollama/tree/main/docs |
| Models | https://ollama.com/search |
| Ollama FAQ | https://github.com/ollama/ollama/blob/main/docs/faq.md |
| Discord | https://discord.com/invite/ollama |
| Reddit | https://www.reddit.com/r/ollama/ |

## OLLAMA ENVIRONMENT VARIABLES
| VAR | DESCRIPTION |
| ------------- | ------------- |
| ```OLLAMA_DEBUG``` | Show additional debug information (e.g. OLLAMA_DEBUG=1) |
| ```OLLAMA_HOST``` | IP Address for the ollama server (default 127.0.0.1:11434) |
| ```OLLAMA_KEEP_ALIVE``` | The duration that models stay loaded in memory (default "5m") |
| ```OLLAMA_MAX_LOADED_MODELS``` | Maximum number of loaded models per GPU |
| ```OLLAMA_MAX_QUEUE``` | Maximum number of queued requests |
| ```OLLAMA_MODELS``` | The path to the models directory |
| ```OLLAMA_NUM_PARALLEL``` | Maximum number of parallel requests |
| ```OLLAMA_NOPRUNE``` | Do not prune model blobs on startup |
| ```OLLAMA_ORIGINS``` | A comma separated list of allowed origins |
| ```OLLAMA_SCHED_SPREAD``` | Always schedule model across all GPUs |
| ```OLLAMA_TMPDIR``` | Location for temporary files |
| ```OLLAMA_FLASH_ATTENTION``` | Enabled flash attention |
| ```OLLAMA_LLM_LIBRARY``` | Set LLM library to bypass autodetection |
| ```OLLAMA_GPU_OVERHEAD``` | Reserve a portion of VRAM per GPU (bytes) |
| ```OLLAMA_LOAD_TIMEOUT``` | How long to allow model loads to stall before giving up (default "5m") |

## 3RD PARTY APIs
| ENTITY | ENDPOINT |
| ------------- | ------------- |
| Anthropic | ```https://api.anthropic.com/v1``` |
| Cerebas | ```https://api.cerebras.ai/v1``` |
| Cloudfare | ```https://api.cloudflare.com/client/v4``` |
| Cohere | ```https://api.cohere.com/v1``` |
| Deepseek | ```https://api.deepseek.com/v1``` |
| Gemini | ```https://api.gemini.com/v1``` |
| Groq | ```https://api.groq.com/openai/v1``` |
| Mistral | ```https://api.mistral.ai/v1``` |
| OpenAI | ```https://api.openai.com/v1``` |
| Runpod | ```https://api.runpod.ai/v2``` |
| Scaleway | ```https://api.scaleway.com/instance/v1``` |
| TogetherAI | ```https://api.together.xyz/v1``` |
| Google | ```https://aiplatform.googleapis.com/v1``` |
| OpenRouter | ```https://openrouter.ai/api/v1``` |
