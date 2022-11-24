import { Post } from "./../../interface/post";
import { noticesMock } from "src/app/mocks/mix";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-works",
  templateUrl: "./works.component.html",
  styleUrls: ["./works.component.scss"],
})
export class WorksComponent implements OnInit {
  notices: Post[] = noticesMock;

  constructor() {}

  ngOnInit(): void {}
}
