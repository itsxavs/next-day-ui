import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RankingService } from "src/app/services/ranking.service";

@Component({
  selector: "app-evaluacion-dialog",
  templateUrl: "./evaluacion-dialog.component.html",
  styleUrls: ["./evaluacion-dialog.component.scss"],
})
export class EvaluacionDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EvaluacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rankingService: RankingService
  ) {
    this.form = this.fb.group({
      presentacion: new FormControl("", Validators.required),
      organizacion: new FormControl("", Validators.required),
      exactitud: new FormControl("", Validators.required),
      general: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.rankingService
      .addCalificacion(this.data.postId, {
        presentacion: this.form.get("presentacion").value,
        organizacion: this.form.get("organizacion").value,
        exactitud: this.form.get("exactitud").value,
        general: this.form.get("general").value,
      })
      .subscribe(() => {
        console.log("Calificacion guardada");
        this.dialogRef.close("guardado");
      });
  }

  setPresentacion(value: number): void {
    this.form.get("presentacion").setValue(value);
  }
  setOrganizacion(value: number): void {
    this.form.get("organizacion").setValue(value);
  }
  setExactitud(value: number): void {
    this.form.get("exactitud").setValue(value);
  }
  setGeneral(value: number): void {
    this.form.get("general").setValue(value);
  }
}
