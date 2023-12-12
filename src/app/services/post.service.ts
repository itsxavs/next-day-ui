import { of } from "rxjs";
import { PostsMockDO, PostsMockReview, PostsMock_1_2 } from "./../mocks/post";
import { mapTo, catchError } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post, statusPost } from "../models/post.interface";

const URI = "http://localhost:3000/post";
@Injectable({
  providedIn: "root",
})
export class PostService {
  mek: HttpParams = new HttpParams();
  constructor(private http: HttpClient) {}

  getPostsByUser(id: string) {
    return this.http.get(`${URI}`, { params: this.mek.append("_id", id) }).pipe(
      mapTo(PostsMock_1_2),
      catchError((err) => of(PostsMock_1_2))
    );
  }
  createPost(post: any) {
    return this.http
      .post(`${URI}/save`, {
        teacherId: post.teacher,
        studentId: post.students[0],
        title: post.title,
        description: post.message,
        file: post.file,
      })
      .subscribe((res: any) => console.log(res));
  }

  getPostsByStatus(status: string, id: string) {
    debugger;
    switch (status) {
      case statusPost.Correct: {
        return this.http
          .get(URI, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMock_1_2),
            catchError((err) => of(PostsMock_1_2))
          );
      }
      case statusPost.Do: {
        return this.http
          .get(URI, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMockDO),
            catchError((err) => of(PostsMockDO))
          );
      }
      case statusPost.Review: {
        return this.http
          .get(URI, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMockReview),
            catchError((err) => of(PostsMockReview))
          );
      }
    }
  }
}
