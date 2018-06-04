namespace Cortex.Services.Dtos
{
    public class Layer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }

        public int NeuronsNumber { get; set; }

        public double X { get; set; }

        public double Y { get; set; }

        public int KernelsNumber { get; set; }

        public int KernelWidth { get; set; }

        public int KernelHeight { get; set; }

        public int Activation { get; set; }

        public int PoolingMode { get; set; }
    }
}