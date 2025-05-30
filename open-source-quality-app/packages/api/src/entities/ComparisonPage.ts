export class ComparisonPage {
  public readonly slug: string;

  public readonly qtdUserVisits: number;

  public readonly projectIds: string[];

  constructor(props: ComparisonPage) {
    this.slug = props.slug;
    this.qtdUserVisits = props.qtdUserVisits;
    this.projectIds = props.projectIds;
  }
}
