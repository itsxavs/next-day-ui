import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

const URI = "http://localhost:5000/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpParams: HttpParams = new HttpParams();
  private student$;

  constructor(private httpClient: HttpClient) {}

  getStudentsByTeacher(teacherId: string) {
    this.httpClient
      .get(URI + "students/getStudentsByTeacher", {
        params: this.httpParams.append("teacherId", teacherId),
      })
      .subscribe((students) => {
        return students;
      });
  }

  getStudents() {
    this.httpClient.get(URI + "students");
  }
}
