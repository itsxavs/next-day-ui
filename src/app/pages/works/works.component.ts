import { Observable } from "rxjs";
import { PostService } from "./../../services/post.service";
import { Post } from "./../../interface/post";
import { noticesMock } from "src/app/mocks/mix";
import { Component, OnInit } from "@angular/core";
import { tabs } from "src/app/interface/tabs.enum";

const tags = [tabs.do, tabs.correct, tabs.create, tabs.review];

@Component({
  selector: "app-works",
  templateUrl: "./works.component.html",
  styleUrls: ["./works.component.scss"],
})
export class WorksComponent implements OnInit {
  notices: Post[] = noticesMock;
  tags = tags;
  posts: Observable<Post[]>;
  isCreate = true;

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPostsByUser("mek");
  }

  goTab(name: string) {
    switch (name) {
      case tabs.create: {
        this.isCreate = true;

        break;
      }
      case tabs.correct: {
        this.posts = this.postService.getPostsByStatus(tabs.correct, "mek");
      }
      default: {
        this.posts = this.postService.getPostsByStatus(name, "mek");
      }
    }
  }
}
