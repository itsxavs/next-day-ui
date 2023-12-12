import { Injectable } from "@angular/core";
import { BaseFilter } from "../baseFilter/base-filter";
import { Observable, of } from "rxjs";
import { Classroom } from "src/app/models";
import { Filter } from "../baseFilter/filter.interface";
import { HttpClient } from "@angular/common/http";

const URL = "https:/localhost:8080/";
@Injectable()
export class ClassroomFilter extends BaseFilter<Filter<Classroom>[]> {
  // classrooms$: Observable<Filter<Classroom>[]> = this.getvalues(URL);
  classrooms$: Observable<Filter<Classroom>[]> = of([
    { value: { letter: "A", number: 1 }, selected: false },
  ]);
  constructor(http: HttpClient) {
    super(http);
  }
}
