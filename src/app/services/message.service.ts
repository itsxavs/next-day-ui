import { messageChatMock } from "src/app/mocks/mix";
import { studentsMock } from "./../mocks/students";
import { teacherMock } from "./../mocks/teachers";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mapTo, tap } from "rxjs/operators";
import { Student, Teacher } from "../interface/user";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  teacher: Teacher;

  constructor(private httpClient: HttpClient) {}

  getMessages(teacher: Teacher, student: Student) {
    return this.httpClient
      .get("http://localhost:5000/messages")
      .pipe(mapTo(messageChatMock));
  }
}
