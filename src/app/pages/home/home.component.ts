import { statusPost } from "./../../interface/post";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { Post } from "src/app/interface/post";
import { noticesMock } from "src/app/mocks/mix";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isTeacher: boolean;
  newPost: Post;
  notices: Post[] = noticesMock;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    /* this.authService.userSelection$.subscribe((user) => {
      user.type === "Teacher"
        ? (this.isTeacher = true)
        : (this.isTeacher = false);
    }); */
  }
  /* openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostModalComponent, {
      width: "400px",
      data: this.newPost,
    });

    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      console.log(result);
      console.log("The dialog was closed");
      /*   this.animal = result; 
    });
  } */
}
