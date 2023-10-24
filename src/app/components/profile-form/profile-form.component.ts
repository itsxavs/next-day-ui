import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Student } from "src/app/core/models";
import { StudentService } from "src/app/services/students.service";

const pronouns = ["he/him", "she/her", "they/them"];

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnInit {
  @Input() isReview: boolean = false;
  @Input() student: Student = null;
  @Output() acceptEvent: EventEmitter<any> = new EventEmitter();
  students = this.studentService.getStudentsByTeacher();
  pronouns = pronouns;

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      name: new FormControl(this.student?.name),
      surname: new FormControl(this.student?.firstName),
      pronouns: new FormControl(this.student?.details?.pronouns),
      email: new FormControl(this.student?.email),
      nameParents: new FormControl(this.student?.details?.nameParents),
      surnameParents: new FormControl(this.student?.details?.surnameParents),
      pronounsParents: new FormControl(this.student?.details?.pronounsParents),
      emailParents: new FormControl(this.student?.details?.emailParents),
      address: new FormControl(this.student?.details?.address),
      phone: new FormControl(this.student?.details?.phone),
      province: new FormControl(this.student?.details?.province),
      city: new FormControl(this.student?.details?.city),
      zip: new FormControl(this.student?.details?.zip),
      additionalInformation: new FormControl(
        this.student?.details?.additionalInformation
      ),
      subject: new FormControl(this.student?.subject),
    });

    this.form.disable();
  }

  edit() {
    this.form.enable();
  }

  save() {
    this.form.disable();
  }
  accept() {
    this.acceptEvent.emit();
  }
}
