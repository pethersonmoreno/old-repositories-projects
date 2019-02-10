using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace WatcherExample.DirectoryWatcher
{
    public class ContainerWatcher
    {
        public event LogMessageEvent LogMessage;
        public event NewFileCreatedEvent NewFileCreated;
        public event WatcherWillStartAgainEvent WatcherWillStartAgain;
        private FileSystemWatcher watcher;
        private readonly string path;
        private readonly string filter;

        private readonly CreatingFileList creatingFileList;

        public ContainerWatcher(string path, string filter)
        {
            creatingFileList = new CreatingFileList();
            // creatingFileList.LogMessage += LogNewMessage;
            this.path = path;
            this.filter = filter;
        }
        public void StartWatching()
        {
            if (watcher != null)
            {
                throw new Exception("Watcher already started");
            }
            Start();
        }
        private void Start()
        {
            LogNewMessage("Watcher Starting ...");
            watcher = new FileSystemWatcher();
            watcher.Path = path;
            watcher.Filter = filter;
            watcher.NotifyFilter = NotifyFilters.LastAccess
                                 | NotifyFilters.LastWrite
                                 | NotifyFilters.FileName
                                 | NotifyFilters.DirectoryName;

            watcher.Changed += OnChanged;
            watcher.Created += OnChanged;
            watcher.Renamed += OnRenamed;
            watcher.Error += OnError;
            try
            {
                watcher.EnableRaisingEvents = true;
                LogNewMessage("Watcher Started");
            }
            catch (Exception ex)
            {
                LogNewMessage("Error on Watcher Starting: " + ex.Message);
                Thread.Sleep(10);
                Start();
            }
        }
        private void Stop()
        {
            LogNewMessage("Watcher Stopping ...");
            try
            {
                watcher.EnableRaisingEvents = false;
            }
            catch (Exception ex)
            {
                LogNewMessage("Error on Watcher Stopping: " + ex.Message);
                if (watcher.EnableRaisingEvents)
                {
                    Thread.Sleep(10);
                    Stop();
                    return;
                }
            }
            try
            {
                watcher.Dispose();
            }
            catch (Exception ex)
            {
                LogNewMessage("Error on Watcher Disposing: " + ex.Message);
            }
            LogNewMessage("Watcher Stopped");
            watcher = null;
        }
        private void Restart()
        {
            LogNewMessage("Watcher Restarting ...");
            Stop();
            creatingFileList.Clear();
            WatcherWillStartAgain?.Invoke();
            Start();
        }

        private void OnError(object sender, ErrorEventArgs e)
        {
            LogNewMessage("Watcher Error = " + e.GetException().Message);
            Restart();
        }

        private void OnChanged(object source, FileSystemEventArgs e)
        {
            if (e.ChangeType == WatcherChangeTypes.Created)
            {
                creatingFileList.AddFilePath(e.FullPath);
            }
            ProcessFileIfCreatedAndReady(e.FullPath);
        }

        private void OnRenamed(object source, RenamedEventArgs e)
        {
            creatingFileList.ChangeFilePath(e.OldFullPath, e.FullPath);
            ProcessFileIfCreatedAndReady(e.FullPath);
        }

        private object lockReadyVerification = "lockReadyVerification";
        private void ProcessFileIfCreatedAndReady(string filePath)
        {
            lock (lockReadyVerification)
            {
                if (creatingFileList.StartReadyVerifing(filePath))
                {
                    if (FileIsReady(filePath))
                    {
                        creatingFileList.RemoveFilePath(filePath);
                        Task.Factory.StartNew(() =>
                        {
                            NewFileCreated?.Invoke(filePath);
                        });
                    }
                    else
                    {
                        creatingFileList.EndReadyVerifing(filePath);
                    }
                }
            }
            if (creatingFileList.Contains(filePath))
            {
                Task.Factory.StartNew(() =>
                {
                    Thread.Sleep(5);
                    ProcessFileIfCreatedAndReady(filePath);
                });
            }
        }
        private void LogNewMessage(string message)
        {
            LogMessage?.Invoke(message);
        }
        private bool FileIsReady(string filePath)
        {
            try
            {
                using (var file = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
