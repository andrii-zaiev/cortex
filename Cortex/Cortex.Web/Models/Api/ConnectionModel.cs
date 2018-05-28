using Cortex.Services.Dtos;

namespace Cortex.Web.Models.Api
{
    public class ConnectionModel
    {
        public ConnectionModel()
        {
        }

        public ConnectionModel(Connection connection)
        {
            Id = connection.Id;
            FromId = connection.FromId;
            ToId = connection.ToId;
        }

        public int Id { get; set; }

        public int FromId { get; set; }

        public int ToId { get; set; }

        public Connection ToDto()
        {
            return new Connection
            {
                Id = Id,
                FromId = FromId,
                ToId = ToId
            };
        }
    }
}