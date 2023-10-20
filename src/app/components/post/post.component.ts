import { Post } from "src/app/core/models/post.interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() role: string;
  statusPost: String;
  isExpanded: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.post.status);
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
