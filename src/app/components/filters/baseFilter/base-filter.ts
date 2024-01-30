import { HttpClient } from "@angular/common/http";
import { Filter } from "./filter.interface";
import { Observable, Subject } from "rxjs";

export abstract class BaseFilter<T> {
  private values$: Subject<T>;

  constructor(readonly http: HttpClient) {}
  getvalues(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  setValues(newValues: T): void {
    return this.values$.next(newValues);
  }
  clean(): void {
    this.values$.next(null);
  }
}
