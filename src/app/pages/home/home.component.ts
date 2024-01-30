import { TokenStorageService } from "src/app/services/token-storage.service";
import { filter, map, switchMap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Post } from "src/app/models/post.interface";
import { FilterFacade } from "src/app/components/filters/filters.facade";
import { Observable } from "rxjs";
import { Classroom, Student } from "src/app/models";
import { PostService } from "src/app/services/post.service";
import { AuthService } from "../../services/auth.service";
import { subject } from "../../models/post.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // isTeacher: boolean;
  // newPost: Post;
  // allNotices: Post[] = noticesMock;
  // notices: Post[];

  role: Observable<string> = this.tokenStorageService.role$;
  post$: Observable<Post[]>;
  filteredPosts$: Observable<Post[]>;

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private readonly facade: FilterFacade,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.post$ =
      this.tokenStorageService.getUser().role === "TEACHER"
        ? this.authService._teacherUser.pipe(
            filter((teacher) => !!teacher),
            switchMap((teacher) =>
              this.postService.getPostsByTeacher(teacher._id)
            )
          )
        : this.authService._studentUser.pipe(
            filter((student) => !!student),
            switchMap((student) =>
              this.postService.getPostsByStudent(student._id)
            )
          );
    this.filteredPosts$ = this.facade.filterSelected.pipe(
      switchMap((filter) =>
        this.post$.pipe(map((posts) => this.filterPosts(posts, filter)))
      )
    );
    // this.facade.filterSelected
    //   .pipe(
    //     tap((value) => {
    //       this.notices = this.allNotices;
    //       this.notices =
    //         this.filterArray(value.status, "status") || this.notices;
    //       this.notices = this.filterClassroom(value.classrooms) || this.notices;
    //       this.notices =
    //         this.filterArray(value.subject, "subject") || this.notices;
    //       this.notices = this.filterDate(value.date) || this.notices;
    //       this.notices = this.filterSearch(value.search) || this.notices;
    //       this._post$.next(this.notices);
    //     })
    //   )
    //   .subscribe();
    // this.tokenStorageService.role$.subscribe((role) => {
    //   if (role === "STUDENT") {
    //     this.facadeStudent
    //       .getStudent(this.tokenStorageService.getUser()._id)
    //       .subscribe(() => {});
    //   } else {
    //   }
    // });
  }

  private filterPosts(posts: Post[], filter: any): Post[] {
    let filteredPosts = posts;

    filteredPosts =
      this.filterArray(filter.status, "status", filteredPosts) || filteredPosts;
    filteredPosts =
      this.filterClassroom(filter.classrooms, filteredPosts) || filteredPosts;
    filteredPosts =
      this.filterArray(filter.subject, "subject", filteredPosts) ||
      filteredPosts;
    filteredPosts =
      this.filterSearch(filter.search, filteredPosts) || filteredPosts;
    filteredPosts =
      this.filterStudent(filter.students, filteredPosts) || filteredPosts;
    filteredPosts =
      this.filterDate(filter.date, filteredPosts) || filteredPosts;

    return filteredPosts;
  }

  private filterArray(value: string[], field: string, filterPost): Post[] {
    if (value.length === 0) return;
    const mek = filterPost.filter((post) => value.includes(post[field]));
    return mek;
  }
  private filterDate(value: boolean, filterPost): Post[] {
    return value
      ? filterPost.sort(
          (a, b) =>
            new Date(a.dateEnd).getTime() - new Date(b.dateEnd).getTime()
        )
      : filterPost.sort(
          (a, b) =>
            new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime()
        );
  }
  private filterSearch(value: string, filterPost): Post[] {
    if (!value) return;
    return filterPost.filter((post) => {
      const upperValue = value.toUpperCase();
      if (
        post.message.toUpperCase().includes(upperValue) ||
        post.title.toUpperCase().includes(upperValue) ||
        post?.subject.toUpperCase().includes(upperValue)
      )
        return post;
    });
  }
  private filterClassroom(value: Classroom[], filterPost): Post[] {
    if (value.length === 0) return;
    const mek = filterPost.filter((post) =>
      value.some(
        ({ letter, number }) => post.classroom === `${number} ${letter}`
      )
    );
    return mek;
  }

  private filterStudent(value: Student[], filterPost): Post[] {
    if (value.length === 0) return;
    const mek = filterPost.filter((post) =>
      value.some(({ _id }) => post.student._id === _id)
    );
    return mek;
  }
}
