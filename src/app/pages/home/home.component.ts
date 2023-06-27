import { statusPost } from "../../core/models/post.interface";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { Post } from "src/app/core/models/post.interface";
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

  ngOnInit() {}
}
