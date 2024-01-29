import { Post } from "src/app/models/post.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() role: string;
  workStudentFile: File;
  workTeacherFile: File;
  file: FormControl = new FormControl();

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    console.log(this.post);
    this.file.setValue(this.post.file);
  }

  onTeacherFileSelected(event) {
    this.workTeacherFile = event.target.files[0];
  }
  onStudentFileSelected(event) {
    this.workStudentFile = event.target.files[0];
  }

  downloadFile() {
    this.postService.downloadFile(this.post._id, `${this.post.title}.pdf`);
  }
}
