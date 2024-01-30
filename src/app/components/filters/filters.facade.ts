import { tap, map, debounceTime, filter, startWith } from "rxjs/operators";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ClassroomFilter } from "./fieldFilters/classroom-filter";
import { StatusFilter } from "./fieldFilters/status-filter";
import { DateFilter } from "./fieldFilters/date-filter";
import { SearchFilter } from "./fieldFilters/search-filter";
import { Classroom, Student, statusPost, subject } from "src/app/models";
import { Filter, selectedFilter } from "./baseFilter/filter.interface";
import { SubjectFilter } from "./fieldFilters/subject.filter";
import { StudentFilter } from "./fieldFilters/students.filter";

@Injectable({
  providedIn: "root",
})
export class FilterFacade {
  // Content of all filters
  classroomContent$: Observable<Filter<Classroom>[]> =
    this.classroom.classrooms$;
  statusContent$: Observable<Filter<statusPost>[]> = this.status.status$;
  subjectContent$: Observable<Filter<subject>[]> = this.subject.subject$;
  studentContent$: Observable<Filter<Student>[]> = this.student.students$;

  // FilterSelected
  private _filtersSelected: BehaviorSubject<selectedFilter> =
    new BehaviorSubject({
      date: false,
      status: [],
      classrooms: [],
      subject: [],
      search: "",
      students: [],
    });
  filterSelected: Observable<selectedFilter> =
    this._filtersSelected.asObservable();
  formFilters: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly classroom: ClassroomFilter,
    private readonly status: StatusFilter,
    private readonly date: DateFilter,
    private readonly search: SearchFilter,
    private readonly subject: SubjectFilter,
    private readonly student: StudentFilter
  ) {
    this.formFilters = this.buildFiltersForm();

    // this.formFilters.valueChanges.subscribe((value) => {
    //   console.log("echar un ojo");
    // });
    // this.formFilters.statusChanges.subscribe((value) => {
    //   console.log("echar un ojo");
    // });
    combineLatest([
      this.getFilterDate(),
      this.getFilterStatus(),
      this.getFilterClassrooms(),
      this.getFilterSubject(),
      this.getFilterSearch(),
      this.getFilterStudent(),
    ])
      .pipe(
        map(([date, status, classrooms, subject, search, students]) =>
          this._filtersSelected.next({
            date: date,
            status,
            classrooms,
            subject,
            search,
            students: students,
          })
        )
      )
      .subscribe();
  }

  buildFiltersForm() {
    return this.fb.group({
      date: new FormControl(),
      status: new FormControl(),
      classroom: new FormControl(),
      subject: new FormControl(),
      search: new FormControl(),
      students: new FormControl(),
    });
  }
  getFilterDate(): Observable<boolean> {
    return this.formFilters.get("date").valueChanges.pipe(startWith(false));
  }

  // getFilterDate(): Observable<any> {
  //   return combineLatest([
  //     this.formFilters.get("date").get("from").valueChanges,
  //     this.formFilters.get("date").get("to").valueChanges,
  //   ]).pipe(
  //     debounceTime(300),
  //     filter(([from, to]) => !!from && !!to),
  //     tap((value) => console.log)
  //   );
  // }
  getFilterStatus(): Observable<string[]> {
    return this.formFilters.get("status").valueChanges.pipe(startWith([]));
  }
  getFilterClassrooms(): Observable<Classroom[]> {
    return this.formFilters.get("classroom").valueChanges.pipe(startWith([]));
  }
  getFilterSubject(): Observable<string[]> {
    return this.formFilters.get("subject").valueChanges.pipe(startWith([]));
  }
  getFilterSearch(): Observable<string> {
    return this.formFilters.get("search").valueChanges.pipe(startWith(""));
  }
  getFilterStudent(): Observable<Student[]> {
    return this.formFilters.get("students").valueChanges.pipe(startWith([]));
  }

  clearFilters() {
    this.formFilters.get("date").setValue(false);
    this.formFilters.get("status").setValue([]);
    this.formFilters.get("classroom").setValue([]);
    this.formFilters.get("subject").setValue([]);
    this.formFilters.get("search").setValue("");
    this.formFilters.get("students").setValue([]);
  }
}
