import { AuthService } from "src/app/services/auth.service";
import { studentsMock } from "./../mocks/students";
import { teacherMock } from "./../mocks/teachers";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, mapTo, switchMap, tap } from "rxjs/operators";
import { Teacher } from "../models/user.interface";
import { BehaviorSubject, of, Observable } from "rxjs";
import { PATH_API } from "../models/path-api.constant";
import { environment } from "src/environments/environment";

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
  private URL = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
    /**
     * Send Student by Subejct
     */
    this.authService.userSelection$
      .pipe(
        filter((user) => !!user),
        filter((user) => user?.role === "STUDENT"),
        switchMap((user) => this.getStudent(user._id)),
        tap((user) => this._student.next(user))
      )
      .subscribe();
  }

  getTeachers() {
    return this.httpClient.get(`${this.URL}students`).pipe(
      map((teachers: any) => {
        return teachers.map((teacher) => {
          return {
            _id: teacher?.idUser._id,
            email: teacher.idUser.email,
            name: teacher.idUser.name,
            firstname: teacher.idUser.firstName,
            lastname: teacher.idUser.lastName,
            students: teacher.students,
            classrooms: teacher.classrooms,
          } as Teacher;
        });
      }),
      mapTo(studentsMock)
    );
  }

  getStudent(userId: string) {
    //userId = `65454eb0d1a5cf4a4c5f07c2`;
    return this.httpClient
      .get(`${this.URL}students/${userId}`)
      .pipe(tap((student) => this._student.next(student)));
  }

  editStudent(studentId: string, student) {
    return this.httpClient.post(`${this.URL}students/modify`, {
      studentId,
      student,
    });
  }

  getDetailsStudent(detailsId: string) {
    return this.httpClient.get(`${this.URL}details-user/${detailsId}`);
  }

  editDetailsStudent(details, student) {
    details = { ...details, _id: student.reviewDetails._id };
    return this.httpClient.post(`${this.URL}students/acceptReviewDetails`, {
      details,
      student,
    });
  }
  deleteReview(details, student): Observable<string> {
    details = { ...details, _id: student.reviewDetails._id };
    return this.httpClient.post<string>(
      `${this.URL}students/deleteReviewDetails`,
      {
        details,
        student,
      }
    );
  }
  createReviewDetails(details, student) {
    return this.httpClient.post(`${this.URL}students/createReviewDetails`, {
      details,
      student,
    });
  }

  getStudentsByTeacher(): any {
    return this.httpClient.get(`${this.URL}students`, httpOptions);
  }
}
