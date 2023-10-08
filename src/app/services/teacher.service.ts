import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Teacher } from "../core/models/user.interface";
import { teacherMock } from "../mocks/teachers";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  teacher: Teacher;

  constructor(private httpClient: HttpClient) {}

  getTeachers() {
    return this.httpClient.get("http://localhost:5000/teachers").pipe(
      map((teachers: any) => {
        return teachers
          .map((teacher) => {
            return {
              _id: teacher?.idUser._id,
              email: teacher.idUser.email,
              name: teacher.idUser.name,
              firstName: teacher.idUser.firstName,
              lastName: teacher.idUser.lastName,
              students: teacher.students,
              classrooms: teacher.classrooms,
            } as Teacher;
          })
          .mapTo([teacherMock]);
      })
    );
  }
}
