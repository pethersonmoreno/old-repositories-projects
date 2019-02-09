using System;
using System.Threading.Tasks;
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
                var cWatcher = new ContainerWatcher(path, filter);
                cWatcher.NewFileCreated += CWatcher_NewFileCreated;
                cWatcher.WatcherWillStartAgain += CWatcher_WatcherWillStartAgain; ;
                cWatcher.StartWatching();
            });
        }

        private static int countFile = 0;
        private static void CWatcher_NewFileCreated(string filePath)
        {
            Console.WriteLine("### " + (++countFile) + " - Arquivo Criado: " + filePath);
        }

        private static void CWatcher_WatcherWillStartAgain()
        {
            Console.WriteLine("### - Watcher vai iniciar novamente");
        }
    }
}
