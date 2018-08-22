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

        public string Comment { get; set; }

        public bool IsInput { get; set; }

        public bool IsOutput { get; set; }
    }
}
