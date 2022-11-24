import { ComponentsModule } from "./../../components/components.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorksComponent } from "./works.component";

@NgModule({
  declarations: [WorksComponent],
  imports: [CommonModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorksModule {}
