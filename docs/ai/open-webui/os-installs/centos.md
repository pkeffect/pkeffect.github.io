# CentOS Stream 10

### Update all packages
```
sudo dnf update
```

### Install Development Tools (for compiling python)
```
sudo dnf group install "Development Tools"
```

### Install extra compile packages (for compiling python)
```
sudo dnf install bzip2-devel ncurses-devel libffi-devel readline-devel sqlite-devel tk-devel gcc make openssl-devel xz-devel wget curl git
```

### Check Python version (3.11 minimum 3.12 maximum)
```
python3 --version
```

### Create a new virtual environment
```
python3 -m venv owui
```

### Activate environment
```
source owui/bin/activate
```

### Upgrade pip if needed
```
pip install --upgrade pip
```

### Install Open WebUI
```
pip install open-webui
```

### Start Open WebUI
```
open-webui serve
```

### Open Web Brower
http://localhost:8080
* cntrl+C to shutdown

### Close virtual environment
```
deactivate
```

### Update Open WebUI
- Make sure you are in your venv environment and use the following command
```
pip install -U open-webui
```

## Install pyenv:
### Git install script
```
curl -fsSL https://pyenv.run | bash
```

### Setup your shell for pyenv
```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init - bash)"' >> ~/.bashrc
```

### Then for your profile
```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init - bash)"' >> ~/.bash_profile
```

### Restart shell
```
exec "$SHELL"
```

### Version check
```
pyenv --version
```

### Look for Python versions
```
pyenv install --list
```

### Install Python version
```
pyenv install 3.11.11
```

### Create a virtual environment
```
pyenv virtualenv 3.11.11 owui
```

### Activate a virtual environment
```
pyenv activate owui
```

### Upgrade pip if needed
```
pip install --upgrade pip
```

### Install Open WebUI
```
pip install open-webui
```

### Start Open WebUI
```
open-webui serve
```

### Open Web Brower
http://localhost:8080
* cntrl+C to shutdown

### Close virtual environment
```
deactivate
```

### Update Open WebUI
- Make sure you are in your venv environment and use the following command
```
pip install -U open-webui
```

## Install Miniconda:
### Download Miniconda installer
```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
```

### Make the installer executable
```
chmod +x ~/miniconda.sh
```

### Run the installer
```
~/miniconda.sh
```

### During installation:
- Accept the license agreement when prompted
- Choose installation location (default is fine)
- Let the installer initialize Miniconda by answering "yes" when asked

### Activate the installation
```
source ~/.bashrc
```

Or close and reopen your terminal.

### Verify Miniconda installation
```
conda --version
```

### Create a new environment with Python 3.11.11
```
conda create --name owui python=3.11.11
```

### Activate the new environment
```
conda activate owui
```

### Verify Python version in the new environment
```
python --version
```

You should see output showing Python 3.11.11.

### Install Open WebUI
```
pip install open-webui
```

### Start Open WebUI
```
open-webui serve
```

### Open Web Brower
http://localhost:8080
* cntrl+C to shutdown

### To deactivate the environment when you're done using it:
```
conda deactivate
```

### Update Open WebUI
- Make sure you are in your venv environment and use the following command
```
pip install -U open-webui
```

That's it! You now have Miniconda installed on CentOS and a Python 3.11.11 virtual environment that you can activate anytime you need it.