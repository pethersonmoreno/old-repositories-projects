namespace cqrs_example1.Command
{
  interface ICommandHandler<TCommand>
  {
    void Handle(TCommand command);
  }
}