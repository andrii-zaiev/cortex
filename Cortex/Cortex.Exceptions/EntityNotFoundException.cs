using System;

namespace Cortex.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(Type entityType, object key)
            : base(CreateMessage(entityType, key))
        {
        }

        private static string CreateMessage(Type entityType, object key)
        {
            return $"Entity of type {entityType.Name} not found by key {key}";
        }
    }
}
