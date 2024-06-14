import { studentsMock } from "./../mocks/students";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mapTo } from "rxjs/operators";
import { environment } from "src/environments/environment";

const URI = "http://localhost:3000/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpParams: HttpParams = new HttpParams();
  private URL = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getStudentsByTeacher(teacherId: string) {
    this.httpClient
      .get(this.URL + "students/getStudentsByTeacher", {
        params: this.httpParams.append("teacherId", teacherId),
      })
      .pipe(mapTo(studentsMock));
  }

  getStudents() {
    this.httpClient.get(this.URL + "students").pipe(mapTo(studentsMock));
  }
}
