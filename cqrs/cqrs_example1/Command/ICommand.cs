using System;

namespace cqrs_example1.Command
{
    public interface ICommand
    {
        Guid Id { get; }
    }
}