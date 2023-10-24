import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ManageComponent } from "./manage.component";
import { ComponentsModule } from "src/app/components/components.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogReviewComponent } from './dialog-review/dialog-review.component';

@NgModule({
  declarations: [ManageComponent, DialogReviewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class ManageModule {}
