﻿using System.Collections.Generic;
using System.Linq;

namespace WatcherExample.DirectoryWatcher
{
    class CreatingFileList
    {
        public event LogMessageEvent LogMessage;
        private IList<string> list;
        private IList<string> listReadyVerifing;

        public CreatingFileList()
        {
            list = new List<string>();
            listReadyVerifing = new List<string>();
        }
        public bool StartReadyVerifing(string filePath)
        {
            lock (list)
            {
                if (list.Contains(filePath) && !listReadyVerifing.Contains(filePath))
                {
                    listReadyVerifing.Add(filePath);
                    return true;
                }
                return false;
            }
        }
        public void EndReadyVerifing(string filePath)
        {

            lock (list)
            {
                listReadyVerifing.Remove(filePath);
            }
        }
        public bool Contains(string filePath)
        {
            lock (list)
            {
                return list.Contains(filePath);
            }
        }
        public void AddFilePath(string filePath)
        {
            lock (list)
            {
                if (!list.Contains(filePath))
                {
                    LogNewMessage("Watcher new " + filePath);
                    list.Add(filePath);
                }
            }
        }
        public void ChangeFilePath(string oldFilePath, string newFilePath)
        {
            lock (list)
            {
                LogNewMessage("Watcher change path " + oldFilePath + " to " + newFilePath);
                list = list.Select(fp => fp == oldFilePath ? newFilePath : fp).ToList();
            }
        }
        public void RemoveFilePath(string filePath)
        {
            lock (list)
            {
                LogNewMessage("Watcher removed " + filePath);
                list.Remove(filePath);
                listReadyVerifing.Remove(filePath);
            }
        }
        public void Clear()
        {
            lock (list)
            {
                LogNewMessage("Watcher clear");
                list.Clear();
            }
        }
        private void LogNewMessage(string message)
        {
            LogMessage?.Invoke(message);
        }
    }
}
