import { AuthService } from "src/app/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Student, Teacher } from "src/app/models";
import { studentsMock } from "src/app/mocks";
import { DialogReviewComponent } from "./dialog-review/dialog-review.component";
import { Observable, Subject } from "rxjs";
import { TeacherService } from "../../services/teacher.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit, OnDestroy {
  listReview: Student[] = studentsMock;

  postExpanded: boolean = false;
  validationExpaded: boolean = false;
  teacher$: Observable<Teacher> = this.authService._teacherUser;
  students: Student[];
  user$: Observable<any> = this.authService._userSelection;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private readonly authService: AuthService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacher$.subscribe((teacher) => {
      this.students = teacher.students;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  changePostExpanded() {
    this.postExpanded = !this.postExpanded;
  }
  changeValidationExpanded() {
    this.validationExpaded = !this.validationExpaded;
  }

  noReview() {
    return (
      this.authService._teacherUser.value.students.filter(
        (student) =>
          student?.reviewDetails !== null &&
          student?.reviewDetails !== undefined
      ).length === 0
    );
  }

  openDialog(student: Student) {
    const dialogRef = this.dialog
      .open(DialogReviewComponent, {
        data: student,
        width: "1200px",
      })
      .afterClosed()
      .subscribe(() => {
        this.teacherService.getTeacher(this.authService._teacherUser.value._id);
      });
  }
}
