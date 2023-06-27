import { Observable } from "rxjs";
import { Post } from "../models";

export abstract class PostRepository {
  abstract getPosts(studentId: string, teacherId: string): Observable<Post[]>;
  abstract getPostsByStudent(studentId: string): Observable<Post[]>;
}
