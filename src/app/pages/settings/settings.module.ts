import { ComponentsModule } from "./../../components/components.module";
import { SettingsComponent } from "./settings.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule {}
