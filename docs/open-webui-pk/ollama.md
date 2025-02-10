---
sidebar_position: 3
---
# OLLAMA Cheat SHeet
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
