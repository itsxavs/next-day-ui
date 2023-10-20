import { TokenStorageService } from "./../../services/token-storage.service";
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
  role = "ROLE_TEACHER";

  constructor(
    public dialog: MatDialog,
    private tokeStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.role = this.tokeStorageService.getUser().roles;
  }
}
