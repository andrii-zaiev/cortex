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

namespace Cortex.DomainModels.Extensions
{
    public static class AccessModeExtensions
    {
        public static DataAccess.Entities.AccessMode ToEntity(this AccessMode mode)
        {
            switch (mode)
            {
                case AccessMode.Private:
                    return DataAccess.Entities.AccessMode.Private;
                case AccessMode.ByPermission:
                    return DataAccess.Entities.AccessMode.ByPermission;
                case AccessMode.Public:
                    return DataAccess.Entities.AccessMode.Public;
                default:
                    throw new ArgumentOutOfRangeException(nameof(mode), mode, null);
            }
        }

        public static AccessMode ToDomain(this DataAccess.Entities.AccessMode mode)
        {
            switch (mode)
            {
                case DataAccess.Entities.AccessMode.Private:
                    return AccessMode.Private;
                case DataAccess.Entities.AccessMode.ByPermission:
                    return AccessMode.ByPermission;
                case DataAccess.Entities.AccessMode.Public:
                    return AccessMode.Public;
                default:
                    throw new ArgumentOutOfRangeException(nameof(mode), mode, null);
            }
        }
    }
}
