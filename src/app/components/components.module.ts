import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";

@NgModule({
  declarations: [PostComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [PostComponent, NavbarComponent],
})
export class ComponentsModule {}
