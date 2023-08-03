import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { FiltersModule } from "./filters/filters.module";
import { FiltersComponent } from "./filters/filters.component";

@NgModule({
  declarations: [PostComponent, NavbarComponent, CreatePostComponent],
  imports: [CommonModule, FiltersModule],
  exports: [
    PostComponent,
    NavbarComponent,
    CreatePostComponent,
    FiltersComponent,
  ],
})
export class ComponentsModule {}
