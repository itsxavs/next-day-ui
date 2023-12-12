import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Student } from "src/app/models";

@Component({
  selector: "app-dialog-review",
  templateUrl: "./dialog-review.component.html",
  styleUrls: ["./dialog-review.component.scss"],
})
export class DialogReviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public dialogRef: MatDialogRef<DialogReviewComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
