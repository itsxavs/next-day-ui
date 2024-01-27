import { StudentsFacade } from "./../facade/students.facade";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { tap } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Post } from "src/app/models/post.interface";
import { noticesMock } from "src/app/mocks/mix";
import { FilterFacade } from "src/app/components/filters/filters.facade";
import { BehaviorSubject, Observable } from "rxjs";
import { Classroom } from "src/app/models";
import { TeacherFacade } from "../facade/teacher.facade";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isTeacher: boolean;
  newPost: Post;
  allNotices: Post[] = noticesMock;
  notices: Post[];
  role: Observable<string> = this.tokenStorageService.role$;
  private _post$: BehaviorSubject<Post[]> = new BehaviorSubject(null);
  post$: Observable<Post[]> = this._post$.asObservable();

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private readonly facade: FilterFacade,
    private facadeStudent: StudentsFacade,
    private facadeTeacher: TeacherFacade
  ) {}

  ngOnInit() {
    this.facade.filterSelected
      .pipe(
        tap((value) => {
          this.notices = this.allNotices;
          this.notices =
            this.filterArray(value.status, "status") || this.notices;
          this.notices = this.filterClassroom(value.classrooms) || this.notices;
          this.notices =
            this.filterArray(value.subject, "subject") || this.notices;
          this.notices = this.filterDate(value.date) || this.notices;
          this.notices = this.filterSearch(value.search) || this.notices;
          this._post$.next(this.notices);
        })
      )
      .subscribe();
    this.tokenStorageService.role$.subscribe((role) => {
      if (role === "STUDENT") {
        this.facadeStudent
          .getStudent(this.tokenStorageService.getUser()._id)
          .subscribe(() => {});
      } else {
      }
    });
  }

  filterArray(value: string[], field: string): Post[] {
    if (value.length === 0) return;
    const mek = this.notices.filter((post) => value.includes(post[field]));
    return mek;
  }
  filterDate(value: { from: string; to: string }): Post[] {
    if (!value.from && !value.to) return;
    return this.notices.filter(
      (post) =>
        new Date(value.from) <= post.createAt &&
        post.createAt <= new Date(value.to)
    );
  }
  filterSearch(value: string): Post[] {
    if (!value) return;
    return this.notices.filter(
      (post) => post.message.includes(value) || post.title.includes(value)
    );
  }
  filterClassroom(value: Classroom[]): Post[] {
    if (value.length === 0) return;
    const mek = this.notices.filter((post) =>
      value.some(
        ({ letter, number }) =>
          post.classroom.letter === letter && post.classroom.number === number
      )
    );
    return mek;
  }
}
