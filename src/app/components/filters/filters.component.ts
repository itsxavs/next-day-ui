import { Component, OnInit } from "@angular/core";
import { ClassroomFilter } from "./fieldFilters/classroom-filter";
import { StatusFilter } from "./fieldFilters/status-filter";
import { DateFilter } from "./fieldFilters/date-filter";
import { SearchFilter } from "./fieldFilters/search-filter";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Filter } from "./baseFilter/filter.interface";
import { Classroom, statusPost } from "src/app/core/models";
import { BehaviorSubject, Observable, combineLatest, merge } from "rxjs";
import { filter, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  classroom$: Observable<Filter<Classroom>[]>;
  status$: Observable<Filter<statusPost>[]>;
  Filters$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  statusForm: FormControl = new FormControl("");
  classroomForm: FormControl = new FormControl("");
  datePicker: FormGroup = new FormGroup({
    start: new FormControl(""),
    end: new FormControl(""),
  });
  searchForm: FormControl = new FormControl("");

  constructor(
    private readonly classroom: ClassroomFilter,
    private readonly status: StatusFilter,
    private readonly date: DateFilter,
    private readonly search: SearchFilter,
    private fb: FormBuilder
  ) {
    this.classroom$ = this.classroom.classrooms$;
    this.status$ = this.status.status$;
    // this.filterForm = this.buildForm();
  }

  ngOnInit(): void {
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
    this.datePicker.valueChanges.subscribe((state) => {
      debugger;
    });
    // TODO
    // El merge no es asincrono del todo se raya si se emite muchos valores a las vez
    // Los valores no respetan quien los emite
    merge(
      this.classroomForm.valueChanges,
      this.datePicker.valueChanges,
      this.statusForm.valueChanges,
      this.searchForm.valueChanges.pipe(
        distinctUntilChanged(),
        filter((word: string) => word.length > 3)
      )
    ).subscribe(([classroom, datePicker, statusForm, searchForm]) => {
      debugger;
    });
  }
}
