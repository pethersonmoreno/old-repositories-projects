using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using WatcherExample;

namespace ThreadPoolPOC
{
    class Program
    {
        const string SOURCE_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcher";
        const string DESTINY_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcherDestino";
        const string FILTER = "*.pdf";
        private static int WORKER_THREADS = Environment.ProcessorCount * 2;
        static void Main(string[] args)
        {
            int maxWorkerThreads;
            int maxCompletionWorkerThreads;
            ThreadPool.GetMaxThreads(out maxWorkerThreads, out maxCompletionWorkerThreads);
            ThreadPool.SetMaxThreads(WORKER_THREADS, maxCompletionWorkerThreads);

            Run();
            Console.WriteLine("Press 'q' to quit the sample.");
            while (Console.ReadKey().KeyChar != 'q') ;
            Environment.Exit(0);
        }

        private static ProcessingVerification processingVerification;
        private static void Run()
        {
            Task.Factory.StartNew(() =>
            {
                processingVerification = new ProcessingVerification();
                var completeExample = new CompleteExample(SOURCE_DIRECTORY, FILTER, processingVerification);
                completeExample.NewFileToProcess += NewFileToProcess;
                completeExample.LogMessage += ShowMessageOnConsole;
                completeExample.StartProcessAndWatching();
            });
        }

        private static void ShowMessageOnConsole(string message)
        {
            Console.WriteLine(message);
        }

        private static object lockCountFiles = "lockCountFiles";
        private static int countFiles = 0;
        private static void NewFileToProcess(string filePath)
        {
            processingVerification.CountUp();
            ThreadPool.QueueUserWorkItem(
                    new WaitCallback(ProcessFileStarted), filePath);
        }

        private static void ProcessFileStarted(object state)
        {
            string filePath = state as string;
            try
            {
                ProcessFile(filePath);
            }
            finally
            {
                processingVerification.CountDown();
            }
        }
        private static void ProcessFile(string filePath)
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
                lock (lockCountFiles)
                {
                    countFiles++;
                    if (countFiles % 200 == 0)
                    {
                        Console.WriteLine("### " + (countFiles) + " - Arquivo Movido: " + fileName);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("### Erro ao processar arquivo " + filePath + ": " + ex.Message);
            }
        }
    }
}
