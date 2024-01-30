import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "src/app/models";
import { BaseFilter } from "../baseFilter/base-filter";
import { Filter } from "../baseFilter/filter.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "../../../services/auth.service";
import { filter, map, switchMap } from "rxjs/operators";
const URL = "https:/localhost:8080/";
@Injectable()
export class StudentFilter extends BaseFilter<Filter<Student>[]> {
  // status$: Observable<Filter<statusPost>[]> = this.getvalues(URL);
  students$: Observable<Filter<Student>[]>;
  constructor(http: HttpClient, private authService: AuthService) {
    super(http);

    this.students$ = this.authService._teacherUser.pipe(
      filter((teacher) => !!teacher),
      switchMap((teacher) =>
        this.http.get("http://localhost:3000/teacher/studentByTeacher", {
          params: new HttpParams().append("teacherId", teacher._id),
        })
      ),
      map((students: Student[]) =>
        students.map((student) => {
          return { value: student, selected: false } as Filter<Student>;
        })
      )
    );
  }
}
