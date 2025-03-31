# Mint 22.1 Cinnamon
<b>Update all packages</b>
```
sudo apt update
```

```
sudo apt upgrade
```

<b>Check Python version (3.11 minimum 3.12 maximum)</b>
```
python3 --version
```

<b>For compiling python</b>
```
sudo apt install build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev python-openssl git
```

<b>Install venv (version must match python version)</b>
```
sudo apt install python3.12-venv
```

<b>Create a new virtual environment</b>
```
python3 -m venv owui
```

<b>Activate environment</b>
```
source owui/bin/activate
```

<b>Upgrade pip if needed</b>
```
pip install --upgrade pip
```

<b>Install Open WebUI</b>
```
pip install open-webui
```

<b>Start Open WebUI</b>
```
open-webui serve
```

<b>Open Web Brower</b>
http://localhost:8080
* cntrl+C to shutdown

<b>Close virtual environment</b>
```
deactivate
```

<b>Update Open WebUI</b>
- Make sure you are in your venv environment and use the following command<
```
pip install -U open-webui
```

## Install pyenv:
<b>Install git and curl</b>
```
sudo apt install git
```

<b>Git install script</b>
```
curl -fsSL https://pyenv.run | bash
```

<b>Setup your shell for pyenv</b>
```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init - bash)"' >> ~/.bashrc
```

<b>Then for your profile</b>
```
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init - bash)"' >> ~/.profile
```

<b>Restart shell</b>
```
exec "$SHELL"
```

<b>Version check</b>
```
pyenv --version
```

<b>Look for Python versions</b>
```
pyenv install --list
```

<b>Install Python version</b>
```
pyenv install 3.11.11
```

<b>Create a virtual environment</b>
```
pyenv virtualenv 3.11.11 owui
```

<b>Activate a virtual environment</b>
```
pyenv activate owui
```

<b>Upgrade pip if needed</b>
```
pip install --upgrade pip
```

<b>Install Open WebUI</b>
```
pip install open-webui
```

<b>Start Open WebUI</b>
```
open-webui serve
```

<b>Open Web Brower</b>
http://localhost:8080
* cntrl+C to shutdown

<b>Close virtual environment</b>
```
deactivate
```

<b>Update Open WebUI</b>
- Make sure you are in your venv environment and use the following command
```
pip install -U open-webui
```

## Install Miniconda:
<b>Download Miniconda installer</b>
```wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
```

<b>Make the installer executable</b>
```
chmod +x ~/miniconda.sh
```

<b>Run the installer</b>
```
~/miniconda.sh
```

<b>During installation:</b>
- Accept the license agreement when prompted
- Choose installation location (default is fine)
- Let the installer initialize Miniconda by answering "yes" when asked

<b>Activate the installation
```
source ~/.bashrc
```

Or close and reopen your terminal</b>

<b>Verify Miniconda installation</b>
```
conda --version
```

<b>Create a new environment with Python 3.11.11</b>
```
conda create --name owui python=3.11.11
```

<b>Activate the new environment</b>
```
conda activate owui
```

<b>Verify Python version in the new environment</b>
```
python --version
```

You should see output showing Python 3.11.11</b>

<b>Install Open WebUI
```
pip install open-webui
```

<b>Start Open WebUI</b>
```
open-webui serve
```

<b>Open Web Brower</b>
http://localhost:8080
* cntrl+C to shutdown

<b>To deactivate the environment when you're done using it:</b>
```
conda deactivate
```

<b>Update Open WebUI</b>
- Make sure you are in your venv environment and use the following command
```
pip install -U open-webui
```

That's it! You now have Miniconda installed on Mint and a Python 3.11.11 virtual environment that you can activate anytime you need it.