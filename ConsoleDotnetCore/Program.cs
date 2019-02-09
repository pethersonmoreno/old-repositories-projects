using System;
using System.Threading.Tasks;
using WatcherExample.DirectoryProcess;
using WatcherExample.DirectoryWatcher;

namespace WatcherExample.ConsoleDotnetCore
{
    class Program
    {
        static void Main(string[] args)
        {
            Run();
            Console.WriteLine("Press 'q' to quit the sample.");
            while (Console.ReadKey().KeyChar != 'q') ;
            Environment.Exit(0);
        }

        private static void Run()
        {
            Task.Factory.StartNew(() =>
            {
                string path = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcher";
                string filter = "*.pdf";
                var dirFilesProcessing = new DirectoryFilesProcessing(path, filter);
                dirFilesProcessing.NewFileToProcess += NewFileToProcess;
                dirFilesProcessing.Process();
                var cWatcher = new ContainerWatcher(path, filter);
                cWatcher.NewFileCreated += NewFileToProcess;
                cWatcher.WatcherWillStartAgain += WatcherWillStartAgain; ;
                cWatcher.LogMessage += ShowMessageOnConsole;
                cWatcher.StartWatching();
            });
        }

        private static void ShowMessageOnConsole(string message)
        {
            Console.WriteLine(message);
        }

        private static int countFile = 0;
        private static void NewFileToProcess(string filePath)
        {
            Console.WriteLine("### " + (++countFile) + " - Arquivo Criado: " + filePath);
        }

        private static void WatcherWillStartAgain()
        {
            Console.WriteLine("### - Watcher vai iniciar novamente");
        }
    }
}
