export class ProjectIssuesAtDate {
  public readonly date: string;

  public readonly qtdAllIssues: number;

  public readonly qtdAllOpenIssues: number;

  public readonly qtdClosedIssuesAtDate: number;

  constructor(props: ProjectIssuesAtDate) {
    this.date = props.date;
    this.qtdAllIssues = props.qtdAllIssues;
    this.qtdAllOpenIssues = props.qtdAllOpenIssues;
    this.qtdClosedIssuesAtDate = props.qtdClosedIssuesAtDate;
  }
}
