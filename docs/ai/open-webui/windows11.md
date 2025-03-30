# Windows 11
Clean Desktop Install

### Download MiniConda
https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

### Run installer
```Miniconda3-latest-Windows-x86_64.exe```

Anaconda PowerShell Prompt and Anaconda Prompt should now be available on the Start Menu

### Verify Miniconda installation
```conda --version```

### Create a new environment with Python 3.11.11
```conda create --name owui python=3.11.11```

### Activate the new environment
```conda activate owui```

### Verify Python version in the new environment
```python --version```

You should see output showing Python 3.11.11.

### Install Open WebUI
```pip install open-webui```

### Start Open WebUI
```open-webui serve```

### Open Web Brower
```http://localhost:8080```
* cntrl+C to shutdown

### To deactivate the environment when you're done using it:
```conda deactivate```

### To update Open WebUI, make sure you are in your venv environment and use the following command
```pip install -U open-webui```

That's it! You now have Miniconda installed on Windows 11 and a Python 3.11.11 virtual environment that you can activate anytime you need it.
