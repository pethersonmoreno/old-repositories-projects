using GdPicture14;
using System;
using System.IO;
using System.Security.Permissions;
using System.Threading;
using System.Threading.Tasks;
using WatcherExample;

namespace GdPictureOcrPOC
{
    class Program
    {
        const string SOURCE_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcher";
        const string DESTINY_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcherDestino";
        const string OCR_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcherOCR";
        const string COMPLETED_DIRECTORY = @"C:\\Users\\DevPlace Developer\\Desktop\\TesteWatcherCompleted";
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
        [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
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
                Console.WriteLine("### - Arquivo Movido: " + fileName + ", processando com GdPicture ...");
                ProcessMovedFileWithGdPicture(destinyFile, OCR_DIRECTORY, COMPLETED_DIRECTORY);
                lock (lockCountFiles)
                {
                    countFiles++;
                    Console.WriteLine("### " + (countFiles) + " - Processado com GdPicture: " + fileName);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("### Erro ao processar arquivo " + filePath + ": " + ex.Message);
            }
        }
        private static void ProcessMovedFileWithGdPicture(string filePath, string ocrDirectory, string completedDirectory)
        {
            var fileName = Path.GetFileName(filePath);
            //We assume that GdPicture has been correctly installed and unlocked.
            GdPicturePDF oGdPicturePDF = new GdPicturePDF();
            //Loading an input document.
            GdPictureStatus status = oGdPicturePDF.LoadFromFile(filePath, false);
            //Checking if loading has been successful.
            if (status == GdPictureStatus.OK)
            {
                int pageCount = oGdPicturePDF.GetPageCount();
                //Loop through pages.
                for (int i = 1; i <= pageCount; i++)
                {
                    //Selecting a page.
                    oGdPicturePDF.SelectPage(i);
                    if (oGdPicturePDF.OcrPage("eng", ocrDirectory, "", 200.0F) != GdPictureStatus.OK)
                    {
                        //Console.WriteLine("OCR Pages Example - Error occurred on the page " + i.ToString() + ". Error: " + oGdPicturePDF.GetStat().ToString());
                    }
                }
                //Saving to a different file.
                var completedFilePath = Path.Combine(
                    completedDirectory,
                    fileName
                );
                status = oGdPicturePDF.SaveToFile(completedFilePath, true);
                if (status == GdPictureStatus.OK)
                    Console.WriteLine("OCR Pages Example - Done! " + fileName);
                else
                    Console.WriteLine("OCR Pages Example - " + "The document can't be saved." + status.ToString() + " "+ fileName);
                //Closing and releasing resources.
                oGdPicturePDF.CloseDocument();
            }
            else
            {
                Console.WriteLine("OCR Pages Example - " + "The document can't be opened." + status.ToString() + " " + fileName);
            }
            oGdPicturePDF.Dispose();
        }
    }
}
