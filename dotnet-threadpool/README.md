# dotnet-threadpool
POC to ThreadPool to process files in the directory. Using Watcher example to get new files in directory after process all files in directory.

## Project's goal

Start the program processing all files with .pdf extension in the directory and start Watcher to directory watching .pdf files, if the Watcher has been stopped, process all files with .pdf extension in the directory and then start Watcher again.

All the .pdf file processing are asynchronous.
