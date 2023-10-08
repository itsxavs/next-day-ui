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

@NgModule({
  declarations: [PostComponent, NavbarComponent, CreatePostComponent],
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
  ],
  exports: [
    PostComponent,
    NavbarComponent,
    CreatePostComponent,
    FiltersComponent,
  ],
})
export class ComponentsModule {}
