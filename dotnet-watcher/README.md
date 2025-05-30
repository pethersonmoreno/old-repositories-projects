# dotnet-watcher
POC to FileSystemWatcher getting all created files in the directory with contingency.

## Project's goal

Start the program processing all files with .pdf extension in the directory and start Watcher to directory watching .pdf files, if the Watcher has been stopped, process all files with .pdf extension in the directory and then start Watcher again.

All the .pdf file processing are synchronous.
