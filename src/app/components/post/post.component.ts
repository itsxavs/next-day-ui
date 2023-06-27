import { Post } from "src/app/core/models/post.interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  statusPost: String;
  constructor() {}

  ngOnInit(): void {
    console.log(this.post.status);
  }
}
