import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProfileFormComponent } from "src/app/components/profile-form/profile-form.component";
import { Student } from "src/app/core/models";
import { studentsMock } from "src/app/mocks";
import { DialogReviewComponent } from "./dialog-review/dialog-review.component";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  listReview: Student[] = studentsMock;

  postExpanded: boolean = false;
  validationExpaded: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
