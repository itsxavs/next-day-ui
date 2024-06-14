import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Teacher } from "../models/user.interface";
import { teacherMock } from "../mocks/teachers";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  teacher: Teacher;
  private URL = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getTeachers() {
    return this.httpClient.get(`${this.URL}teachers`).pipe(
      map((teachers: any) => {
        return teachers
          .map((teacher) => {
            return {
              _id: teacher?.idUser._id,
              email: teacher.idUser.email,
              name: teacher.idUser.name,
              firstname: teacher.idUser.firstName,
              lastname: teacher.idUser.lastName,
              students: teacher.students,
              classrooms: teacher.classrooms,
            } as Teacher;
          })
          .mapTo([teacherMock]);
      })
    );
  }

  getTeacher(teacherId: string) {
    const params = new HttpParams().set("teacherId", teacherId);
    return this.httpClient
      .get(`${this.URL}teacher`, { params })
      .subscribe((teacher) => {
        this.authService._teacherUser.next(teacher as Teacher);
      });
  }
}
