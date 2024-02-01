import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post.interface";
import { noticesMock } from "src/app/mocks/mix";
import { Component, OnInit } from "@angular/core";
import { tabs } from "src/app/models/tabs.constant";
import { StudentsFacade } from "../facade/students.facade";
import { StudentService } from "src/app/services/students.service";
import { AuthService } from "../../services/auth.service";
import { TeacherService } from "../../services/teacher.service";

const tags = [tabs.do, tabs.correct, tabs.create, tabs.review];

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  notices: Post[] = noticesMock;
  tags = tags;
  posts: Observable<Post[]>;
  roleStudent = true;
  student = this.authService._studentUser;
  studentDetails: string;

  constructor(
    private readonly postService: PostService,
    private facade: StudentsFacade,
    private authService: AuthService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPostsByUser("mek");
    // this.facade.getDetails(`${this.student.details}`).pipe(tap(() => {
    //
    // })).subscribe();
  }

  // Esto no lo borro porque en el manage como tiene dos tab puede que lo use
  goTab(name: string) {
    switch (name) {
      case tabs.create: {
        this.roleStudent = true;

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
