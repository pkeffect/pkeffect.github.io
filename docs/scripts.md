# Scripts
## Docker Project Deployment Windows
The script below will create a directory with the basic files for your project. 

* Copy the code below and save as ```start.bat``` 
* Click to run from current directory
```
@echo off

echo:
echo This will setup a basic docker deployment
echo It creates a compose.yml, .env, start.bat
echo Edit to suit your needs, happy docking
echo:

:prompt_directory

:: Prompt user for directory name
set /p dirName= Enter a directory name for your project:

:: Check if directory already exists
if exist "%dirName%" (
    echo Directory %dirName% already exists. Please enter another name.
    goto prompt_directory
)

:: Create directory with given name
mkdir "%dirName%"
if errorlevel 1 (
    echo Failed to create directory %dirName%. Exiting...
    exit /b 1
)

:: Create .env file
echo Creating .env file...
(
    echo # Example .env file for Docker Compose
    echo # Uncomment anything below to use
	echo:
    echo # SAFE_MODE=false
    echo # APP_NAME=changeme
) > "%dirName%\.env"
if errorlevel 1 (
    echo Failed to create .env file. Exiting...
    exit /b 1
)

::  Create Docker  compose.yaml file
echo Creating compose.yaml file...
(
    echo # https://www.yamllint.com/ - YAML Validator
    echo # https://docs.docker.com/compose/ - Docker Compose
    echo:
    echo name: project_name
    echo services:
    echo   project_name:
    echo     image: docker_image  # Replace with actual Docker image
    echo     container_name: container_name
    echo     stdin_open: true
    echo     tty: true    
    echo     ports:
    echo       - "3999:8080"
    echo     volumes:
    echo       - ./data:/app/backend/data # Local mounted in working directory
    echo     deploy: # Nvidia GPU Support - Nvidia Toolkit may be required as well
    echo       resources:
    echo         reservations:
    echo           devices:
    echo             - driver: nvidia
    echo               count: 1
    echo               capabilities:
    echo                 - gpu      
    echo     env_file: .env      
    echo     environment:
    echo       - 'SAFE_MODE=${SAFE_MODE}'    
    echo       - 'APP_NAME=${APP_NAME}'
    echo     extra_hosts:
    echo       - "host.docker.internal:host-gateway"      
    echo     restart: unless-stopped
    echo     networks:
    echo      - "FBIVan03145" # Custom Network    
    echo networks:
    echo   FBIVan03145:
    echo     external: true
) > "%dirName%\compose.yaml"
if errorlevel 1 (
    echo Failed to create compose.yaml file. Exiting...
    exit /b 1
)

:: Creating a batch script to run the compose.yaml file
echo Creating start.bat file to run your compose file once edited

(
    @echo off
    echo docker-compose up -d
    echo pause
) > "%dirName%\start.bat"
if errorlevel 1 (
    echo Failed to create start.bat file. Exiting...
    exit /b 1
)

:: End of setup
echo Directory setup complete!
pause
```