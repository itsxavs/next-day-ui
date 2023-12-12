import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { statusPost, subject } from "src/app/models";
import { BaseFilter } from "../baseFilter/base-filter";
import { Filter } from "../baseFilter/filter.interface";
import { HttpClient } from "@angular/common/http";
const URL = "https:/localhost:8080/";
@Injectable()
export class SubjectFilter extends BaseFilter<Filter<subject>[]> {
  // status$: Observable<Filter<statusPost>[]> = this.getvalues(URL);
  subject$: Observable<Filter<subject>[]> = of([
    { value: subject.Mathematics, selected: false },
    { value: subject.Geography, selected: false },
    { value: subject.Language, selected: false },
    { value: subject.Science, selected: false },
  ]);
  constructor(http: HttpClient) {
    super(http);
  }
}
