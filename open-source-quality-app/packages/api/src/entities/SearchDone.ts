import { v4 as uuid } from 'uuid';

export class SearchDone {
  public readonly id: string;

  public readonly search: string;

  public readonly qtdSearches: number;

  constructor(props: Omit<SearchDone, 'id'>, id?: string) {
    this.search = props.search;
    this.qtdSearches = props.qtdSearches;
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}
