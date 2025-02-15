---
sidebar_position: 2
---
# Open-WebUI Backup Script

Description: This script performs a backup of a directory using robocopy, excluding a specified folder. It logs the start and end times of the backup, as well as any errors that occur.

Usage:

Set the SOURCE and DESTINATION variables to the directories you want to back up from and to, respectively.
Set the LOG_FILE variable to the location where you want to save the log file.
Optionally set the SOURCE_DEV and DESTINATION_DEV variables to perform an overwrite of a second directory.

Script:
```
@echo off
setlocal enabledelayedexpansion

:: Set source and destination folders for backup
set "SOURCE=<Source Directory>"
set "DESTINATION=<Destination Directory>"

:: Set source and destination folders for secondary backup (optional)
set "SOURCE_DEV=<Source Directory for Dev>"
set "DESTINATION_DEV=<Destination Directory for Dev>"

:: Set log file location
set "LOG_FILE=<Log File Directory>\backup_log_%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt"

:: Create log file directory if it doesn't exist
if not exist "!LOG_FILE!\.." md "!LOG_FILE!\.."

:: Log start time
echo [%time%] Backup started >> "!LOG_FILE!"

:: Check if source folder exists
if not exist "!SOURCE!" (
  echo [%time%] Error: Source folder "!SOURCE!" does not exist. >> "!LOG_FILE!"
  exit /b 1
)

:: Check if destination folder exists
if not exist "!DESTINATION!" (
  echo [%time%] Error: Destination folder "!DESTINATION!" does not exist. >> "!LOG_FILE!"
  exit /b 1
)

:: Check if secondary destination folder exists (if set)
if defined SOURCE_DEV if not exist "!DESTINATION_DEV!" (
  echo [%time%] Error: Destination folder for secondary instance "!DESTINATION_DEV!" does not exist. >> "!LOG_FILE!"
  exit /b 1
)

:: Perform backup using robocopy, excluding the cache folder
robocopy "!SOURCE!" "!DESTINATION!" /MIR /NFL /NDL /XD "!SOURCE!\cache" >> "!LOG_FILE!"

:: Perform overwrite of secondary instance's data folder (if set)
if defined SOURCE_DEV (
  robocopy "!SOURCE_DEV!" "!DESTINATION_DEV!" /MIR /NFL /NDL >> "!LOG_FILE!"
)

:: Check if destination folder contains same number of directories
set "dirs_count_source=0"
for /d /r "!SOURCE!" %%D in (*) do set /a dirs_count_source+=1
set "dirs_count_dst=0"
for /d /r "!DESTINATION!" %%D in (*) do set /a dirs_count_dst+=1
if !dirs_count_source! EQU !dirs_count_dst! (
  echo [%time%] Backup completed successfully. >> "!LOG_FILE!"
) else (
  echo [%time%] Backup failed. >> "!LOG_FILE!"
)

:: Log end time
echo [%time%] Backup finished. >> "!LOG_FILE!"
```
Variables:

SOURCE: Directory to backup from
DESTINATION: Directory to backup to
SOURCE_DEV: Directory to backup from (secondary instance)
DESTINATION_DEV: Directory to backup to (secondary instance)
LOG_FILE: Location to save the log file

Notes:

Make sure to replace <Source Directory>, <Destination Directory>, <Log File Directory>, etc. with the actual directory paths you want to use.
The script uses robocopy to perform the backup, excluding the cache folder.
The script also performs an overwrite of a secondary instance's data folder, if set.
The script logs the start and end times of the backup, as well as any errors that occur.