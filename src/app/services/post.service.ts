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
  createPost(post: any, nodeBuffer: any, teacherId: string) {
    const formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        teacher: teacherId,
        students: post.students,
        title: post.title,
        message: post.message,
        classroom: post.classroom,
      })
    );
    formData.append("bufferFile", nodeBuffer);

    return this.http
      .post(`${URI}/save`, formData)
      .subscribe((res: any) => console.log(res));
  }

  getPostsByStatus(status: string, id: string) {
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
