import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Student, Teacher } from "src/app/models";
import { studentsMock } from "src/app/mocks";
import { DialogReviewComponent } from "./dialog-review/dialog-review.component";
import { Observable } from "rxjs";

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
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }

  changePostExpanded() {
    this.postExpanded = !this.postExpanded;
  }
  changeValidationExpanded() {
    this.validationExpaded = !this.validationExpaded;
  }

  openDialog(student: Student) {
    const dialogRef = this.dialog.open(DialogReviewComponent, {
      data: student,
      width: "1200px",
    });
  }
}
