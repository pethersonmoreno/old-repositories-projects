using System.Threading;
using WatcherExample.DirectoryProcess;
using WatcherExample.DirectoryWatcher;

namespace WatcherExample
{
    public class CompleteExample
    {
        public event LogMessageEvent LogMessage;
        public event NewFileToProcessEvent NewFileToProcess;
        private readonly string path;
        private readonly string filter;
        private readonly DirectoryFilesProcessing directoryFilesProcessing;
        private readonly ContainerWatcher containerWatcher;

        public CompleteExample(string path, string filter)
        {
            this.path = path;
            this.filter = filter;
            directoryFilesProcessing = new DirectoryFilesProcessing(path, filter);
            directoryFilesProcessing.NewFileToProcess += ProcessFile;
            containerWatcher = new ContainerWatcher(path, filter);
            containerWatcher.NewFileCreated += ProcessFile;
            containerWatcher.WatcherWillStartAgain += WatcherWillStartAgain;
            containerWatcher.LogMessage += LogNewMessage;
        }
        public void StartProcessAndWatching()
        {
            ProcessAllFilesInDirectory();
            containerWatcher.StartWatching();
        }

        private void WatcherWillStartAgain()
        {
            ProcessAllFilesInDirectory();
        }
        private void ProcessAllFilesInDirectory()
        {
            while (directoryFilesProcessing.Process())
            {
                Thread.Sleep(10);
            }
        }

        private void LogNewMessage(string message)
        {
            LogMessage?.Invoke(message);
        }
        private void ProcessFile(string filePath)
        {
            NewFileToProcess?.Invoke(filePath);
        }
    }
}