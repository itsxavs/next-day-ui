import { subject } from "../../models/post.interface";
import { combineLatest } from "rxjs";
import { tap } from "rxjs/operators";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { StudentService } from "src/app/services/students.service";
import { AuthService } from "src/app/services/auth.service";
import { DetailsStudent, Student, User } from "src/app/models";

const pronouns = ["he/him", "she/her", "they/them"];

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnInit {
  @Input() isReview: boolean = false;
  @Input() student: Student;
  @Output() acceptEvent: EventEmitter<any> = new EventEmitter();
  students = this.studentService.getStudentsByTeacher();
  pronouns = pronouns;

  studentId;
  userId;
  // student;

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
    private fb: FormBuilder
  ) {
    this.buildFormInizialize();
  }

  ngOnInit(): void {
    if (this.isReview) this.buildForm(this.student.reviewDetails, this.student);
    if (!this.isReview) this.buildForm(this.student.details, this.student);

    // combineLatest([
    //   this.authService._userSelection,
    //   this.authService._studentUser,
    //   this.authService._teacherUser,
    // ])
    //   .pipe(
    //     tap(([user, student, teacher]) => {
    //       this.userId = user._id;
    //       this.studentId = student._id;
    //       this.student = student;
    //     })
    //   )
    //   .subscribe();
  }

  buildFormInizialize() {
    this.form = this.fb.group({
      name: new FormControl(),
      surname: new FormControl(),
      pronouns: new FormControl(),
      email: new FormControl(),
      nameParents: new FormControl(),
      surnameParents: new FormControl(),
      pronounsParents: new FormControl(),
      emailParents: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      province: new FormControl(),
      city: new FormControl(),
      zip: new FormControl(),
      additionalInformation: new FormControl(),
      subjects: new FormControl(),
    });

    this.form.disable();
  }

  buildForm(details, student) {
    //user
    this.form.get("name").setValue(student?.name);
    this.form
      .get("surname")
      .setValue(`${student?.firstname} ${student?.lastname}`);
    this.form.get("email").setValue(student?.email);

    //student
    const subjects = student?.subjects.reduce((subjects, subject) => {
      return (subjects = `${subjects}, ${subject}`);
    }, "");
    this.form.get("subjects").setValue(subjects);

    //details
    this.form.get("pronouns").setValue(details?.pronouns);
    this.form.get("nameParents").setValue(details?.nameParents);
    this.form.get("surnameParents").setValue(details?.surnameParents);
    this.form.get("pronounsParents").setValue(details?.pronounsParents);
    this.form.get("emailParents").setValue(details?.emailParents);
    this.form.get("address").setValue(details?.address);
    this.form.get("phone").setValue(details?.phone);
    this.form.get("province").setValue(details?.province);
    this.form.get("city").setValue(details?.city);
    this.form.get("zip").setValue(details?.zip);
    this.form
      .get("additionalInformation")
      .setValue(details?.additionalInformation);

    // this.form = this.fb.group({
    //   name: new FormControl(details?.name),
    //   surname: new FormControl(details?.firstName),
    //   pronouns: new FormControl(details?.details?.pronouns),
    //   email: new FormControl(details?.email),
    //   nameParents: new FormControl(details?.details?.nameParents),
    //   surnameParents: new FormControl(details?.details?.surnameParents),
    //   pronounsParents: new FormControl(details?.details?.pronounsParents),
    //   emailParents: new FormControl(details?.details?.emailParents),
    //   address: new FormControl(details?.details?.address),
    //   phone: new FormControl(details?.details?.phone),
    //   province: new FormControl(details?.details?.province),
    //   city: new FormControl(details?.details?.city),
    //   zip: new FormControl(details?.details?.zip),
    //   additionalInformation: new FormControl(
    //     details?.details?.additionalInformation
    //   ),
    //   subject: new FormControl(details?.subject),
    // });

    this.form.disable();
  }

  // private buildForm() {
  //   this.form = this.fb.group({
  //     name: new FormControl(this.student?.name),
  //     surname: new FormControl(this.student?.firstName),
  //     pronouns: new FormControl(this.student?.details?.pronouns),
  //     email: new FormControl(this.student?.email),
  //     nameParents: new FormControl(this.student?.details?.nameParents),
  //     surnameParents: new FormControl(this.student?.details?.surnameParents),
  //     pronounsParents: new FormControl(this.student?.details?.pronounsParents),
  //     emailParents: new FormControl(this.student?.details?.emailParents),
  //     address: new FormControl(this.student?.details?.address),
  //     phone: new FormControl(this.student?.details?.phone),
  //     province: new FormControl(this.student?.details?.province),
  //     city: new FormControl(this.student?.details?.city),
  //     zip: new FormControl(this.student?.details?.zip),
  //     additionalInformation: new FormControl(
  //       this.student?.details?.additionalInformation
  //     ),
  //     subject: new FormControl(this.student?.subject),
  //   });

  //   this.form.disable();
  // }

  edit() {
    this.form.enable();
  }

  save() {
    const user = {
      name: this.form.get("name").value,
      fistname: this.form.get("surname").value.split(" ")[0],
      lastName: this.form.get("surname").value.split(" ")[0],
      email: this.form.get("email").value,
    };
    this.student.name = this.form.get("name").value;
    this.student.firstname = this.form.get("surname").value.split(" ")[0];
    this.student.lastname = this.form.get("surname").value.split(" ")[1];
    this.student.email = this.form.get("email").value;
    combineLatest([
      //el primero son los datos iniciales y el otro los valores de form
      this.studentService.createReviewDetails(this.form.value, this.student),
      // this.studentService.editStudent(this.studentId, {
      //   subjects: this.form.get("subjects").value,
      // }),
      // this.authService.editUser(this.userId, user),
    ])
      .subscribe
      // (mek: [details: DetailsStudent, student: Student, user: User]) => {
      //   this.authService._studentUser.next(mek[1]);
      //   this.authService._userSelection.next(mek[2]);
      // }
      ();
    this.form.disable();
  }
  accept() {
    this.student.name = this.form.get("name").value;
    this.student.firstname = this.form.get("surname").value.split(" ")[0];
    this.student.lastname = this.form.get("surname").value.split(" ")[1];
    this.student.email = this.form.get("email").value;
    this.studentService
      .editDetailsStudent(this.form.value, this.student)
      .subscribe(() => {
        this.acceptEvent.emit();
      });
  }
}
