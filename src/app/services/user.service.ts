import { studentsMock } from "./../mocks/students";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mapTo } from "rxjs/operators";

const URI = "http://localhost:5000/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpParams: HttpParams = new HttpParams();

  constructor(private httpClient: HttpClient) {}

  getStudentsByTeacher(teacherId: string) {
    this.httpClient
      .get(URI + "students/getStudentsByTeacher", {
        params: this.httpParams.append("teacherId", teacherId),
      })
      .pipe(mapTo(studentsMock));
  }

  getStudents() {
    this.httpClient.get(URI + "students").pipe(mapTo(studentsMock));
  }
}
