import { Post } from "src/app/models/post.interface";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostService } from "src/app/services/post.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { saveAs } from "file-saver";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EvaluacionDialogComponent } from "../evaluacion-dialog/evaluacion-dialog.component";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: Post;
  @Input() role: string;
  isExpadido: boolean = false;
  fileToReview: File;
  fileToDone: File;
  file: FormControl = new FormControl();
  exerciceReviewName: string;
  exerciceDoneName: string;
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  status: string;
  urlPhoto: string;

  estadoProfesor: string[] = ["PENDING", "REVIEW", "DONE"];
  estadoEstudiando: string[] = ["DO", "REVIEWING", "CORRECT"];

  constructor(
    private postService: PostService,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    console.log(this.post);
    this.file.setValue(this.post.file);
    this.getStatusByRole();
    this.urlPhoto = this.getPhotoPerfil(this.post.subject);

    if (this.post["exerciceDoneName"]) {
      this.exerciceDoneName = this.post["exerciceDoneName"];
      this.fileToDone = this.bufferToFile(
        this.post["exerciceDone"],
        this.exerciceDoneName
      );
    }
    if (this.post["exerciceReviewName"]) {
      this.exerciceReviewName = this.post["exerciceReviewName"];
      this.fileToReview = this.bufferToFile(
        this.post["exerciceReview"],
        this.exerciceReviewName
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getStatusByRole();
  }

  addFileToReview(event) {
    this.postService.addFileToReview(this.post._id, event.target.files[0]);
    this.fileToReview = event.target.files[0];
    this.exerciceReviewName = event.target.files[0].name;
  }
  addFileToDone(event) {
    // this.postService.addFileToDone(this.post._id, event.target.files[0]);
    // this.fileToDone = event.target.files[0];
    // this.exerciceDoneName = event.target.files[0].name;
    this.openAddFileDialog();
  }
  openAddFileDialog(): void {
    const dialogRef = this.dialog.open(EvaluacionDialogComponent, {
      width: "320px",
      data: { postId: this.post._id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  downloadFile() {
    this.loading.next(true);
    this.postService
      .downloadFile(this.post._id, `${this.post.title}.pdf`)
      .subscribe((blob) => {
        setTimeout(() => {
          saveAs(blob, `${this.post.title}.pdf`);
          this.loading.next(false);
        }, 1000);
      });
  }
  downloadFileDone() {
    this.postService
      .downloadFile(this.post._id, `${this.post["exerciceDoneName"]}.pdf`)
      .subscribe((blob) => {
        saveAs(blob, `${this.post["exerciceDoneName"]}.pdf`);
      });
  }
  downloadFileReview() {
    this.postService
      .downloadFile(this.post._id, `${this.post["exerciceReviewName"]}.pdf`)
      .subscribe((blob) => {
        saveAs(blob, `${this.post["exerciceReviewName"]}.pdf`);
      });
  }
  bufferToFile(buffer: ArrayBuffer, fileName: string): File {
    let blob = new Blob([buffer], { type: "application/pdf" });
    return new File([blob], fileName, { type: "application/pdf" });
  }
  handleOpened() {
    this.isExpadido = !this.isExpadido;
  }

  verificar(date: any): boolean {
    date = new Date(date);
    return date > new Date();
  }
  download(file: File) {
    saveAs(file, `${file.name}`);
  }

  private getStatusByRole() {
    if (this.role === "TEACHER") {
      switch (this.post.status) {
        case "DO":
          this.status = "NON-DELIVERED";
          break;
        case "REVIEW":
          this.status = "REVIEW";
          break;
        case "DONE":
          this.status = "DONE";
          break;
      }
    } else {
      switch (this.post.status) {
        case "DO":
          this.status = "DO";
          break;
        case "REVIEW":
          this.status = "IN REVIEWING";
          break;
        case "DONE":
          this.status = "CORRECTED";
          break;
      }
    }
  }

  getPhotoPerfil(name: string) {
    return `../../../assets/img/${name}.jpg`;
  }
}
