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
using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Api
{
    public class UserModel
    {
        public UserModel(User user)
        {
            Id = user.Id;
            UserName = user.UserName.ToLower();
            Name = user.Name;
        }

        public Guid Id { get; }

        public string UserName { get; }

        public string Name { get; }
    }
}
