import { Post } from "src/app/models/post.interface";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostService } from "src/app/services/post.service";
import { tap } from "rxjs/operators";
import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() role: string;
  isExpadido: boolean = false;
  fileToReview: File;
  fileToDone: File;
  file: FormControl = new FormControl();
  exerciceReviewName: FormControl = new FormControl();
  exerciceDoneName: FormControl = new FormControl();

  constructor(
    private postService: PostService,
    private tokenStorageService: TokenStorageService
  ) {}
  ngOnInit(): void {
    console.log(this.post);
    this.file.setValue(this.post.file);
    // if (this.post["exerciceDoneName"])
    //   this.exerciceDoneName.setValue(this.post["exerciceDoneName"]);
    // if (this.post["exerciceReviewName"])
    //   this.exerciceDoneName.setValue(this.post["exerciceReviewName"]);
    // if (this.exerciceDoneName?.value)
    //   this.fileToDone = this.bufferToFile(
    //     this.post["exerciceDone"],
    //     this.exerciceDoneName?.value
    //   );
    // if (this.exerciceReviewName?.value)
    //   this.fileToReview = this.bufferToFile(
    //     this.post["exerciceReview"],
    //     this.exerciceReviewName?.value
    //   );
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
  bufferToFile(buffer: ArrayBuffer, fileName: string): File {
    let blob = new Blob([buffer], { type: "application/octet-stream" });
    return new File([blob], fileName, { type: "application/octet-stream" });
  }
  handleOpened() {
    this.isExpadido = !this.isExpadido;
  }

  verificar(date: any): boolean {
    date = new Date(date);
    return date > new Date();
  }
}
