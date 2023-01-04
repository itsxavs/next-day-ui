import { studentsMock } from "./../mocks/students";
import { teacherMock } from "./../mocks/teachers";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mapTo, tap } from "rxjs/operators";
import { Teacher } from "../interface/user";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  teacher: Teacher;

  constructor(private httpClient: HttpClient) {}

  getTeachers() {
    return this.httpClient.get("http://localhost:5000/students").pipe(
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
}
