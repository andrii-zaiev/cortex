using System.Collections.Generic;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NetworkVersionsListModel
    {
        public NetworkVersionsListModel(List<NetworkVersionModel> versions, bool canEdit)
        {
            Versions = versions;
            CanEdit = canEdit;
        }

        public List<NetworkVersionModel> Versions { get; }

        public bool CanEdit { get;}
    }
}
