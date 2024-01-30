import { Component, OnInit, Input } from "@angular/core";
import { ClassroomFilter } from "./fieldFilters/classroom-filter";
import { StatusFilter } from "./fieldFilters/status-filter";
import { DateFilter } from "./fieldFilters/date-filter";
import { SearchFilter } from "./fieldFilters/search-filter";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Filter } from "./baseFilter/filter.interface";
import { Classroom, Student, statusPost, subject } from "src/app/models";
import { BehaviorSubject, Observable, combineLatest, merge } from "rxjs";
import { filter, distinctUntilChanged } from "rxjs/operators";
import { FilterFacade } from "./filters.facade";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Input() role: string;
  @Input() students: Student[];
  // Load content filters
  classroom$: Observable<Filter<Classroom>[]> = this.facade.classroomContent$;
  status$: Observable<Filter<statusPost>[]> = this.facade.statusContent$;
  subject$: Observable<Filter<subject>[]> = this.facade.subjectContent$;
  students$: Observable<Filter<Student>[]> = this.facade.studentContent$;
  // -----------------------------
  sortOrder: boolean = false;
  private _filters$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  filters$ = this._filters$.asObservable();

  formFilters: FormGroup;

  constructor(private facade: FilterFacade) {}

  ngOnInit(): void {
    this.formFilters = this.facade.formFilters;
    // this.classroomForm.valueChanges.subscribe(() => {
    //   debugger;
    // });
    // combineLatest([
    //   this.classroomForm.valueChanges,
    //   this.datePicker.valueChanges,
    //   this.statusForm.valueChanges,
    //   this.searchForm.valueChanges.pipe(
    //     distinctUntilChanged(),
    //     filter((word: string) => word.length > 3)
    //   ),
    // ]).subscribe(([classroom, datePicker, statusForm, searchForm]) => {
    //   debugger;
    // });
    // this.datePicker.valueChanges.subscribe((state) => {
    //   debugger;
    // });
    // // TODO
    // // El merge no es asincrono del todo se raya si se emite muchos valores a las vez
    // // Los valores no respetan quien los emite
    // merge(
    //   this.classroomForm.valueChanges,
    //   this.datePicker.valueChanges,
    //   this.statusForm.valueChanges,
    //   this.searchForm.valueChanges.pipe(
    //     distinctUntilChanged(),
    //     filter((word: string) => word.length > 3)
    //   )
    // ).subscribe(([classroom, datePicker, statusForm, searchForm]) => {
    //   debugger;
    // });
  }
  toggleSort() {
    this.formFilters.get("date").setValue(!this.sortOrder);
    this.sortOrder = !this.sortOrder;
  }
  clearFilters() {
    this.facade.clearFilters();
  }
}
