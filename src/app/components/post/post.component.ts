import { Post } from "src/app/models/post.interface";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent {
  @Input() post: Post;
  @Input() role: string;
  workStudentFile: File;
  workTeacherFile: File;

  constructor() {}

  onTeacherFileSelected(event) {
    this.workTeacherFile = event.target.files[0];
  }
  onStudentFileSelected(event) {
    this.workStudentFile = event.target.files[0];
  }
}
