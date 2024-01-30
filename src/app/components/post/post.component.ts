import { Post } from "src/app/models/post.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostService } from "src/app/services/post.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() role: string;
  fileToReview: File;
  fileToDone: File;
  file: FormControl = new FormControl();
  fileToReviewForm: FormControl = new FormControl();
  fileToDoneForm: FormControl = new FormControl();

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    console.log(this.post);
    this.file.setValue(this.post.file);
  }

  addFileToReview(event) {
    this.postService.addFileToReview(this.post._id, event.target.files[0]);
    this.fileToReview = event.target.files[0];
  }
  addFileToDone(event) {
    this.postService.addFileToDone(this.post._id, event.target.files[0]);
    this.fileToDone = event.target.files[0];
  }

  downloadFile() {
    this.postService.downloadFile(this.post._id, `${this.post.title}.pdf`);
  }
}
