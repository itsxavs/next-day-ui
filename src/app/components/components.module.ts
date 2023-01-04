import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";
import { CreatePostComponent } from "./create-post/create-post.component";

@NgModule({
  declarations: [PostComponent, NavbarComponent, CreatePostComponent],
  imports: [CommonModule],
  exports: [PostComponent, NavbarComponent, CreatePostComponent],
})
export class ComponentsModule {}
