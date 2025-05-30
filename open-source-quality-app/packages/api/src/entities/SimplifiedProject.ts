export class SimplifiedProject {
  public readonly fullName: string;

  public readonly owner: string;

  public readonly name: string;

  public readonly description: string;

  constructor(props: SimplifiedProject) {
    this.fullName = props.fullName;
    this.owner = props.owner;
    this.name = props.name;
    this.description = props.description;
  }
}
