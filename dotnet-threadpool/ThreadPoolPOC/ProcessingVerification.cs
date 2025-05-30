using WatcherExample;

namespace ThreadPoolPOC
{
    public class ProcessingVerification : IProcessingVerification
    {
        private int countProcessing;

        public ProcessingVerification()
        {
            this.countProcessing = 0;
        }

        public void CountUp()
        {
            lock (this)
            {
                this.countProcessing++;
            }
        }
        public void CountDown()
        {
            lock (this)
            {
                this.countProcessing--;
            }
        }
        public bool IsProcessing()
        {
            lock (this)
            {
                return (this.countProcessing != 0);
            }
        }
    }
}