import { AuthService } from "src/app/services/auth.service";
import { studentsMock } from "./../mocks/students";
import { teacherMock } from "./../mocks/teachers";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mapTo, switchMap, tap } from "rxjs/operators";
import { Teacher } from "../models/user.interface";
import { BehaviorSubject, of, Observable } from "rxjs";
import { PATH_API } from "../models/path-api.constant";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class StudentService {
  teacher: Teacher;
  private _student: BehaviorSubject<any> = new BehaviorSubject(null);
  student$: Observable<any> = this._student.asObservable();

  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
    /**
     * Send Student by Subejct
     */
    this.authService.userSelection$
      .pipe(
        switchMap((user) => {
          return user.role === "ROLE_STUDENT"
            ? this.getStudent(user._id)
            : null;
        }),
        tap((user) => this._student.next(user))
      )
      .subscribe();
  }

  getTeachers() {
    return this.httpClient.get("http://localhost:3000/students").pipe(
      map((teachers: any) => {
        return teachers.map((teacher) => {
          return {
            _id: teacher?.idUser._id,
            email: teacher.idUser.email,
            name: teacher.idUser.name,
            firstName: teacher.idUser.firstName,
            lastName: teacher.idUser.lastName,
            students: teacher.students,
            classrooms: teacher.classrooms,
          } as Teacher;
        });
      }),
      mapTo(studentsMock)
    );
  }

  getStudent(userId: string) {
    return this.httpClient
      .get(`${PATH_API.NEXT_DAY_API}student/${userId}`)
      .pipe(tap((student) => this._student.next(student)));
  }

  editStudent(studentId: string, student) {
    return this.httpClient.post(`${PATH_API.NEXT_DAY_API}student/modify`, {
      studentId,
      student,
    });
  }

  getDetailsStudent(detailsId: string) {
    return this.httpClient.get(
      `${PATH_API.NEXT_DAY_API}details-user/${detailsId}`
    );
  }

  editDetailsStudent(detailsId, details) {
    return this.httpClient.post(`${PATH_API.NEXT_DAY_API}details-user/`, {
      details,
      detailsId,
    });
  }

  getStudentsByTeacher(): any {
    return this.httpClient.get(`${PATH_API.NEXT_DAY_API}students`, httpOptions);
  }
}
