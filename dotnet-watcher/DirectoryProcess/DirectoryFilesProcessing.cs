using System.IO;

namespace WatcherExample.DirectoryProcess
{
    public class DirectoryFilesProcessing
    {
        public event NewFileToProcessEvent NewFileToProcess;
        private readonly string path;
        private readonly string filter;

        public DirectoryFilesProcessing(string path, string filter)
        {
            this.path = path;
            this.filter = filter;
        }
        public bool Process()
        {
            var allFiles = Directory.GetFiles(path, filter);
            if (allFiles.Length == 0)
            {
                return false;
            }
            foreach (var filePath in allFiles)
            {
                NewFileToProcess?.Invoke(filePath);
            }
            return true;
        }
    }
}