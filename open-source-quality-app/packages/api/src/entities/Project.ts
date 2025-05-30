export class Project {
  public readonly id: string;

  public readonly owner: string;

  public readonly name: string;

  public readonly description: string;

  // public readonly qtdIssues: number;
  public readonly qtdOpenIssues: number;
  // public readonly avgTimeCloseIssues: number;
  // public readonly stdDeviationTimeCloseIssues: number;
  // public readonly qtdStars: number;
  // public readonly qtdForks: number;
  // public readonly qtdContributors: number;
  // public readonly qtdWatchers: number;
  // public readonly issueLabels: Array<{
  //   label: string;
  //   qtdIssues: string;
  //   qtdOpenIssues: string;
  //   qtdClosedIssues: string;
  // }>;

  constructor(props: Project) {
    this.id = props.id;
    this.owner = props.owner;
    this.name = props.name;
    this.description = props.description;
    // this.qtdIssues = props.qtdIssues;
    this.qtdOpenIssues = props.qtdOpenIssues;
    // this.avgTimeCloseIssues = props.avgTimeCloseIssues;
    // this.stdDeviationTimeCloseIssues = props.stdDeviationTimeCloseIssues;
    // this.qtdStars = props.qtdStars;
    // this.qtdForks = props.qtdForks;
    // this.qtdContributors = props.qtdContributors;
    // this.qtdWatchers = props.qtdWatchers;
    // this.issueLabels = props.issueLabels;
  }
}
