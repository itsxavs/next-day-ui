import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatusFilter } from "./fieldFilters/status-filter";
import { ClassroomFilter } from "./fieldFilters/classroom-filter";
import { DateFilter } from "./fieldFilters/date-filter";
import { FiltersComponent } from "./filters.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { SearchFilter } from "./fieldFilters/search-filter";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [FiltersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ClassroomFilter, StatusFilter, DateFilter, SearchFilter],
})
export class FiltersModule {}
