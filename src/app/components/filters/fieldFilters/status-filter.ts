import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { statusPost } from "src/app/models";
import { BaseFilter } from "../baseFilter/base-filter";
import { Filter } from "../baseFilter/filter.interface";
import { HttpClient } from "@angular/common/http";
const URL = "https:/localhost:8080/";
@Injectable()
export class StatusFilter extends BaseFilter<Filter<statusPost>[]> {
  // status$: Observable<Filter<statusPost>[]> = this.getvalues(URL);
  status$: Observable<Filter<statusPost>[]> = of([
    { value: statusPost.Done, selected: false },
    { value: statusPost.Review, selected: false },
    { value: statusPost.Do, selected: false },
  ]);
  constructor(http: HttpClient) {
    super(http);
  }
}
