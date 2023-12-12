import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { DetailsStudent, Student, User } from "src/app/models";
import { StudentService } from "src/app/services/students.service";

@Injectable({
  providedIn: "root",
})
export class StudentsFacade {
  _student: BehaviorSubject<Student> = new BehaviorSubject<Student>(null);
  details: BehaviorSubject<DetailsStudent> =
    new BehaviorSubject<DetailsStudent>(null);
  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private studentService: StudentService) {}

  getStudent(userId: string) {
    return this.studentService
      .getStudent(userId)
      .pipe(
        tap((student: Student) =>
          this._student.next({ ...student, details: student.details })
        )
      );
  }
  getDetails(detailsId: string) {
    return this.studentService
      .getDetailsStudent(detailsId)
      .pipe(
        tap((details: DetailsStudent) =>
          this._student.next({ ...this._student.getValue(), details: details })
        )
      );
  }
}
