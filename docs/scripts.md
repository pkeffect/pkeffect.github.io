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


## Docker Compose Python Launcher
```
#!/bin/bash
#======================================================================
# Docker Compose Startup Helper
# 
# This script automatically finds and runs Docker Compose files with
# proper error handling and status reporting.
#
# Features:
# - Automatically detects common Docker Compose filenames
# - Provides clear visual feedback with emoji indicators
# - Handles errors gracefully with descriptive messages
# - Includes optional debugging capabilities
#======================================================================

#----------------------------------------------------------------------
# Configuration Options
#----------------------------------------------------------------------

# Enable debug mode to see every command executed (uncomment to enable)
# set -x

# Set error handling: exit on command errors and unbound variables
set -euo pipefail

# Color definitions for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

#----------------------------------------------------------------------
# Functions
#----------------------------------------------------------------------

# Function to print colored status messages
print_status() {
    local icon="$1"
    local message="$2"
    local color="$3"
    
    echo -e "${color}${icon} ${message}${NC}"
}

# Function to check Docker daemon status
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_status "❌" "Docker daemon is not running! Please start Docker first." "$RED"
        exit 3
    fi
}

# Function to check Docker Compose availability
check_docker_compose() {
    if ! docker compose version >/dev/null 2>&1; then
        print_status "❌" "Docker Compose is not available. Please install it first." "$RED"
        exit 4
    fi
}

#----------------------------------------------------------------------
# Main Script
#----------------------------------------------------------------------

# Display script header
print_status "🐳" "Docker Compose Startup Helper" "$BLUE"
echo "---------------------------------------"

# Check prerequisites
print_status "🔍" "Checking prerequisites..." "$YELLOW"
check_docker
check_docker_compose

# Array of Docker Compose filenames to check (in order of preference)
compose_files=("compose.yaml" "compose.yml" "docker-compose.yaml" "docker-compose.yml")

# Get current directory for reference
current_dir=$(pwd)
print_status "📂" "Searching for Docker Compose files in: $current_dir" "$YELLOW"

# Initialize variables
compose_file=""
found=false

# Loop through potential filenames and check existence
for file in "${compose_files[@]}"; do
    if [[ -f "$file" ]]; then
        compose_file="$file"
        print_status "✅" "Found: $compose_file" "$GREEN"
        found=true
        break
    else
        print_status "❌" "Not found: $file" "$RED"
    fi
done

# Check if a file was found, exit with error if not
if ! $found; then
    print_status "❌" "Error: No valid Docker Compose file found in $current_dir!" "$RED"
    echo
    print_status "💡" "Tip: Create one of these files: ${compose_files[*]}" "$YELLOW"
    exit 1
fi

# Run Docker Compose with error handling
print_status "🚀" "Starting services from $compose_file..." "$BLUE"
echo

# Try to start the services, capture exit code for error handling
if docker compose -f "$compose_file" up -d; then
    echo
    print_status "✅" "Services started successfully!" "$GREEN"
    
    # Display running containers for user convenience
    echo
    print_status "📋" "Currently running containers:" "$BLUE"
    docker compose -f "$compose_file" ps
else
    exit_code=$?
    echo
    print_status "❌" "Docker Compose failed with exit code: $exit_code" "$RED"
    print_status "🔍" "Possible issues:" "$YELLOW"
    echo "  - Check the syntax in $compose_file"
    echo "  - Ensure Docker daemon is running properly"
    echo "  - Verify network connectivity for image pulling"
    echo "  - Check for port conflicts with existing services"
    exit 2
fi

# Optional pause to view results (useful when running from GUI)
echo
read -p "Press Enter to exit..."
```
