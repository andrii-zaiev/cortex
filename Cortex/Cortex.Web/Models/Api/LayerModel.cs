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
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Type { get; set; }

        public int NeuronsNumber { get; set; }

        public double X { get; set; }

        public double Y { get; set; }

        public Layer ToDto()
        {
            return new Layer
            {
                Id = Id,
                Name = Name,
                NeuronsNumber = NeuronsNumber,
                Type = Type,
                X = X,
                Y = Y
            };
        }
    }
}