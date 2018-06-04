using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Api
{
    public class LayerModel
    {
        public LayerModel()
        {
        }

        public LayerModel(Layer layer)
        {
            Id = layer.Id;
            Name = layer.Name;
            Type = layer.Type;
            NeuronsNumber = layer.NeuronsNumber;
            X = layer.X;
            Y = layer.Y;
            Activation = layer.Activation;
            KernelsNumber = layer.KernelsNumber;
            KernelWidth = layer.KernelWidth;
            KernelHeight = layer.KernelHeight;
            PoolingMode = layer.PoolingMode;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }

        public int NeuronsNumber { get; set; }

        public int Activation { get; set; }

        public double X { get; set; }

        public double Y { get; set; }

        public int KernelsNumber { get; set; }

        public int KernelWidth { get; set; }

        public int KernelHeight { get; set; }

        public int PoolingMode { get; set; }

        public Layer ToDto()
        {
            return new Layer
            {
                Id = Id,
                Name = Name,
                NeuronsNumber = NeuronsNumber,
                Type = Type,
                X = X,
                Y = Y,
                Activation = Activation,
                KernelsNumber = KernelsNumber,
                KernelWidth = KernelWidth,
                KernelHeight = KernelHeight,
                PoolingMode = PoolingMode
            };
        }
    }
}