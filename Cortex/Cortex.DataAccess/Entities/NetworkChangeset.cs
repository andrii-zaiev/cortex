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


using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cortex.DataAccess.Entities
{
    public class NetworkChangeset
    {
        public Guid Id { get; set; }

        public string Comment { get; set; }

        [ForeignKey(nameof(Network))]
        public Guid NetworkId { get; set; }

        public DateTimeOffset Date { get; set; }

        [ForeignKey(nameof(Author))]
        public Guid AuthorId { get; set; }

        [MaxLength(40)]
        public string Sha { get; set; }

        public Network Network { get; set; }

        public User Author { get; set; }
    }
}
