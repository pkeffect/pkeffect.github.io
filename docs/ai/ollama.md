---
sidebar_position: 4
---

# Ollama Cheat Sheet

## OllAMA LINKS

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

| Variable | Default Value | Description + Effect + Scenario |
| ------------- | ------------- | ------------- |
| ```OLLAMA_HOST``` | "http://127.0.0.1:11434" | Configures the host and scheme for the Ollama server. Effect: Determines the URL used for connecting to the Ollama server. Scenario: Useful when deploying Ollama in a distributed environment or when you need to expose the service on a specific network interface. |
| ```OLLAMA_ORIGINS``` | [localhost, 127.0.0.1, 0.0.0.0] + app://, file://, tauri:// | Configures allowed origins for CORS. Effect: Controls which origins are allowed to make requests to the Ollama server. Scenario: Critical when integrating Ollama with web applications to prevent unauthorized access from different domains. |
| ```OLLAMA_MODELS``` | $HOME/.ollama/models | Sets the path to the models directory. Effect: Determines where model files are stored and loaded from. Scenario: Useful for managing disk space on different drives or setting up shared model repositories in multi-user environments. |
| ```OLLAMA_KEEP_ALIVE``` | 5 minutes | Sets how long models stay loaded in memory. Effect: Controls the duration models remain in memory after use. Scenario: Longer durations improve response times for frequent queries but increase memory usage. Shorter durations free up resources but may increase initial response times. |
| ```OLLAMA_DEBUG``` | false | Enables additional debug information. Effect: Increases verbosity of logging and debugging output. Scenario: Invaluable for troubleshooting issues or understanding the system's behavior during development or deployment. |
| ```OLLAMA_FLASH_ATTENTION``` | false | Enables experimental flash attention feature. Effect: Activates an experimental optimization for attention mechanisms. Scenario: Can potentially improve performance on compatible hardware but may introduce instability. |
| ```OLLAMA_NOHISTORY``` | false | Disables readline history. Effect: Prevents command history from being saved. Scenario: Useful in security-sensitive environments where command history should not be persisted. |
| ```OLLAMA_NOPRUNE``` | false | Disables pruning of model blobs on startup. Effect: Keeps all model blobs, potentially increasing disk usage. Scenario: Helpful when you need to maintain all model versions for compatibility or rollback purposes. |
| ```OLLAMA_SCHED_SPREAD``` | false | Allows scheduling models across all GPUs. Effect: Enables multi-GPU usage for model inference. Scenario: Beneficial in high-performance computing environments with multiple GPUs to maximize hardware utilization. |
| ```OLLAMA_INTEL_GPU``` | false | Enables experimental Intel GPU detection. Effect: Allows usage of Intel GPUs for model inference. Scenario: Useful for organizations leveraging Intel GPU hardware for AI workloads. |
| ```OLLAMA_LLM_LIBRARY``` | "" (auto-detect) | Sets the LLM library to use. Effect: Overrides automatic detection of LLM library. Scenario: Useful when you need to force a specific library version or implementation for compatibility or performance reasons. |
| ```OLLAMA_TMPDIR``` | System default temp directory | Sets the location for temporary files. Effect: Determines where temporary files are stored. Scenario: Important for managing I/O performance or when system temp directory has limited space. |
| ```OLLAMA_KV_CACHE_TYPE``` | "" | Quantization type for the K/V cache (default: f16) |
| ```OLLAMA_RUNNERS_DIR``` | System-dependent | Sets the location for runners. Effect: Determines where runner executables are located. Scenario: Important for custom deployments or when runners need to be isolated from the main application. |
| ```OLLAMA_NUM_PARALLEL``` | 0 (unlimited) | Sets the number of parallel model requests. Effect: Controls concurrency of model inference. Scenario: Critical for managing system load and ensuring responsiveness in high-traffic environments. |
| ```OLLAMA_MAX_LOADED_MODELS``` | 0 (unlimited) | Sets the maximum number of loaded models. Effect: Limits the number of models that can be simultaneously loaded. Scenario: Helps manage memory usage in environments with limited resources or many different models. |
| ```OLLAMA_MAX_QUEUE``` | 512 | Sets the maximum number of queued requests. Effect: Limits the size of the request queue. Scenario: Prevents system overload during traffic spikes and ensures timely processing of requests. |
| ```OLLAMA_MAX_VRAM``` | 0 (unlimited) | Sets a maximum VRAM override in bytes. Effect: Limits the amount of VRAM that can be used. Scenario: Useful in shared GPU environments to prevent a single process from monopolizing GPU memory. |
| ```OLLAMA_GPU_OVERHEAD``` | "" | Reserve a portion of VRAM per GPU (bytes) |
| ```OLLAMA_LOAD_TIMEOUT``` | "" | How long to allow model loads to stall before giving up (default "5m") |
| ```CUDA_VISIBLE_DEVICES``` | All available | Sets which NVIDIA devices are visible. Effect: Controls which NVIDIA GPUs can be used. Scenario: Critical for managing GPU allocation in multi-user or multi-process environments. |
| ```HIP_VISIBLE_DEVICES``` | All available | Sets which AMD devices are visible. Effect: Controls which AMD GPUs can be used. Scenario: Similar to CUDA_VISIBLE_DEVICES but for AMD hardware. |

