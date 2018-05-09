using System;

namespace Cortex.VersionsStorage
{
    public interface INetworkVersionsStorage
    {
        void Init(Guid networkId);
    }
}