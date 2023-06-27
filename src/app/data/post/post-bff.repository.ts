import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post, statusPost, tabs } from "src/app/core/models";
import { PostRepository } from "src/app/core/repositories/post.repository";
import { studentsMock } from "src/app/mocks/students";
import { teacherMock } from "src/app/mocks/teachers";

@Injectable({ providedIn: "root" })
export class ActivityBffRepository extends PostRepository {
  getPosts(studentId: string, teacherId: string): Observable<Post[]> {
    return of([
      {
        message: "mek",
        student: studentsMock[0],
        teacher: teacherMock,
        status: statusPost.Correct,
        title: "hola",
        createAt: new Date(),
        subject: "lengua",
      },
    ]);
  }
  getPostsByStudent(studentId: string): Observable<Post[]> {
    return of([
      {
        message: "mek",
        student: studentsMock[0],
        teacher: teacherMock,
        status: statusPost.Correct,
        title: "hola",
        createAt: new Date(),
        subject: "lengua",
      },
    ]);
  }
}
