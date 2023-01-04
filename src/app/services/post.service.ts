import { PostsMock_1_2 } from "./../mocks/post";
import { mapTo } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../interface/post";

const URI = "http://localhost:5000/posts";
@Injectable({
  providedIn: "root",
})
export class PostService {
  mek: HttpParams = new HttpParams();
  constructor(private http: HttpClient) {}

  getPostsByUser(id: string) {
    this.http
      .get(URI, { params: this.mek.append("_id", id) })
      .pipe(mapTo(PostsMock_1_2));
  }
  createPost(post: Post) {
    this.http
      .post(URI, {
        teacherId: post.teacher._id,
        studentId: post.student._id,
        tittle: post.title,
        message: post.message,
        creator: post.teacher.name,
      })
      .subscribe((res: any) => console.log(res));
  }
}
