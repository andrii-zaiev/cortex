// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
            Comment = layer.Comment;
            IsInput = layer.IsInput;
            IsOutput = layer.IsOutput;
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

        public string Comment { get; set; }

        public bool IsInput { get; set; }

        public bool IsOutput { get; set; }

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
                PoolingMode = PoolingMode,
                Comment = Comment,
                IsInput = IsInput,
                IsOutput = IsOutput
            };
        }
    }
}
