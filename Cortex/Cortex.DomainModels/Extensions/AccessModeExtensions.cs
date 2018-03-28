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
