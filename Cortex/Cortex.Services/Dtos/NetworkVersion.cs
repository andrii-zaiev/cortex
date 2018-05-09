using System;
using System.Collections.Generic;
using System.Text;
using Cortex.DomainModels;

namespace Cortex.Services.Dtos
{
    public class NetworkVersion
    {
        public NetworkVersion(NetworkChangesetModel changeset)
        {
            Metadata = new NetworkVersionMetadata(changeset);
        }

        public NetworkVersionMetadata Metadata { get; }
    }
}
