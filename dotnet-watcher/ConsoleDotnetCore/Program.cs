using System;
using System.IO;
using System.Threading.Tasks;
using WatcherExample.DirectoryProcess;
using WatcherExample.DirectoryWatcher;

namespace WatcherExample.ConsoleDotnetCore
{
    class Program
    {
        const string SOURCE_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcher";
        const string DESTINY_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcherDestino";
        const string FILTER = "*.pdf";
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
                var completeExample = new CompleteExample(SOURCE_DIRECTORY, FILTER);
                completeExample.NewFileToProcess += NewFileToProcess;
                completeExample.LogMessage += ShowMessageOnConsole;
                completeExample.StartProcessAndWatching();
            });
        }

        private static void ShowMessageOnConsole(string message)
        {
            Console.WriteLine(message);
        }

        private static int countFile = 0;
        private static void NewFileToProcess(string filePath)
        {
            try
            {
                var fileName = Path.GetFileName(filePath);
                var destinyFile = Path.Combine(
                    DESTINY_DIRECTORY,
                    fileName
                );
                if (File.Exists(destinyFile))
                {
                    File.Delete(destinyFile);
                }
                File.Move(filePath, destinyFile);
                Console.WriteLine("### " + (++countFile) + " - Arquivo Movido: " + fileName);
            }
            catch (Exception ex)
            {
                Console.WriteLine("### Erro ao processar arquivo " + filePath + ": " + ex.Message);
            }
        }
    }
}
