import { Observable, of } from "rxjs";
import { PostsMockDO, PostsMockReview, PostsMock_1_2 } from "./../mocks/post";
import { mapTo, catchError } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post, statusPost } from "../models/post.interface";
import { saveAs } from "file-saver";
import { environment } from "src/environments/environment";

const URI = "http://localhost:3000/post";
@Injectable({
  providedIn: "root",
})
export class PostService {
  mek: HttpParams = new HttpParams();
  constructor(private http: HttpClient) {}
  private URL = `${environment.apiUrl}post`;
  getPostsByUser(id: string) {
    return this.http
      .get(`${this.URL}`, { params: this.mek.append("_id", id) })
      .pipe(
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
        subject: post.subject,
        dateEnd: post.endDate,
      })
    );
    formData.append("bufferFile", nodeBuffer, nodeBuffer.name);

    return this.http.post(`${this.URL}/save`, formData);
  }

  getPostsByStatus(status: string, id: string) {
    switch (status) {
      case statusPost.Done: {
        return this.http
          .get(this.URL, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMock_1_2),
            catchError((err) => of(PostsMock_1_2))
          );
      }
      case statusPost.Do: {
        return this.http
          .get(this.URL, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMockDO),
            catchError((err) => of(PostsMockDO))
          );
      }
      case statusPost.Review: {
        return this.http
          .get(this.URL, {
            params: this.mek.append("_id", id).append("status", status),
          })
          .pipe(
            mapTo(PostsMockReview),
            catchError((err) => of(PostsMockReview))
          );
      }
    }
  }

  getPostsByTeacher(teacherId: string): Observable<Post[]> {
    let params = new HttpParams().append("teacherId", teacherId);
    return this.http.get<Post[]>(`${this.URL}`, { params });
  }
  getPostsByStudent(studentId: string): Observable<Post[]> {
    let params = new HttpParams().append("studentId", studentId);
    return this.http.get<Post[]>(`${this.URL}/student`, { params });
  }
  downloadFile(postId: string, filename: string) {
    let params = new HttpParams().append("postId", postId);

    return this.http.get(`${this.URL}/file`, { params, responseType: "blob" });
  }
  downloadFileReview(postId: string, filename: string) {
    let params = new HttpParams().append("postId", postId);

    return this.http.get(`${this.URL}/fileReview`, {
      params,
      responseType: "blob",
    });
  }
  downloadFileDone(postId: string, filename: string) {
    let params = new HttpParams().append("postId", postId);

    return this.http.get(`${this.URL}/fileDone`, {
      params,
      responseType: "blob",
    });
  }
  addFileToReview(postId: string, file: File) {
    const formData = new FormData();
    formData.append("bufferFile", file);
    formData.append("postId", postId);
    this.http
      .post(`${this.URL}/addFiletoReview`, formData)
      .subscribe((res) => console.log(res));
  }
  addFileToDone(postId: string, file: File) {
    const formData = new FormData();
    formData.append("bufferFile", file);
    formData.append("postId", postId);

    this.http
      .post(`${this.URL}/addFiletoDone`, formData)
      .subscribe((res) => console.log(res));
  }
}
