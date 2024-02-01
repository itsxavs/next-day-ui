import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Student, Teacher } from "src/app/models";
import { studentsMock } from "src/app/mocks";
import { DialogReviewComponent } from "./dialog-review/dialog-review.component";
import { Observable } from "rxjs";
import { TeacherService } from "../../services/teacher.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  listReview: Student[] = studentsMock;

  postExpanded: boolean = false;
  validationExpaded: boolean = false;
  teacher$: Observable<Teacher> = this.authService._teacherUser;
  students: Student[];
  user$: Observable<any> = this.authService._userSelection;

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

  changePostExpanded() {
    this.postExpanded = !this.postExpanded;
  }
  changeValidationExpanded() {
    this.validationExpaded = !this.validationExpaded;
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
