using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WatcherExample.DirectoryWatcher
{
    class CreatingFileList
    {
        private IList<string> list;

        public CreatingFileList()
        {
            list = new List<string>();
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
                    Console.WriteLine("Watcher new " + filePath);
                    list.Add(filePath);
                }
            }
        }
        public void ChangeFilePath(string oldFilePath, string newFilePath)
        {
            lock (list)
            {
                Console.WriteLine("Watcher change path " + oldFilePath + " to " + newFilePath);
                list = list.Select(fp => fp == oldFilePath ? newFilePath : fp).ToList();
            }
        }
        public void RemoveFilePath(string filePath)
        {
            lock (list)
            {
                Console.WriteLine("Watcher removed " + filePath);
                list.Remove(filePath);
            }
        }
        public void Clear()
        {
            lock (list)
            {
                Console.WriteLine("Watcher clear");
                list.Clear();
            }
        }
    }
}
