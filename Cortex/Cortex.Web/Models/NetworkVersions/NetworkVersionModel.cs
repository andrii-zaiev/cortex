using System;
using Cortex.Services.Dtos;
using Cortex.Web.Models.Shared;

namespace Cortex.Web.Models.NetworkVersions
{
    public class NetworkVersionModel
    {
        public NetworkVersionModel(NetworkVersion version, User author)
        {
            Id = version.Id;
            Comment = version.Comment;
            Date = version.Date;

            Author = new UserDisplayModel(author);
        }

        public Guid Id { get; }

        public string Comment { get; }

        public DateTimeOffset Date { get; }

        public UserDisplayModel Author { get; }
    }
}
