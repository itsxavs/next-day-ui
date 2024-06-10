import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { FiltersModule } from "./filters/filters.module";
import { FiltersComponent } from "./filters/filters.component";
import { ProfileFormComponent } from "./profile-form/profile-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { EvaluacionDialogComponent } from "./evaluacion-dialog/evaluacion-dialog.component";
import { GraficoComponent } from "./grafico/grafico.component";

@NgModule({
  declarations: [
    PostComponent,
    NavbarComponent,
    CreatePostComponent,
    ProfileFormComponent,
    EvaluacionDialogComponent,
    GraficoComponent,
  ],
  imports: [
    CommonModule,
    FiltersModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    PostComponent,
    NavbarComponent,
    CreatePostComponent,
    FiltersComponent,
    ProfileFormComponent,
    GraficoComponent,
  ],
})
export class ComponentsModule {}
