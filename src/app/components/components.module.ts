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

@NgModule({
  declarations: [PostComponent, NavbarComponent, CreatePostComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [PostComponent, NavbarComponent, CreatePostComponent],
})
export class ComponentsModule {}
