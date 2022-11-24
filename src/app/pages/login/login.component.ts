import { Classroom } from "./../../interface/utils";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Teacher, User } from "src/app/interface/user";
import { TeacherService } from "src/app/services/teacher.service";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  header = "LOGIN";
  isTeacher = false;
  classroomList: Classroom[];
  teacherList: Teacher[];
  classrooms = new FormControl();
  teachers = new FormControl();
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.utilsService
      .getClassroom()
      .subscribe((classrooms) => (this.classroomList = classrooms));
    this.teacherService
      .getTeachers()
      .subscribe((teachers) => (this.teacherList = teachers));
  }
  register() {
    if (!this.isLogin && this.isTeacher) {
      this.authService.register(
        this.form.get("name").value,
        this.form.get("email").value,
        this.form.get("password").value,
        this.form.get("firstName").value,
        this.form.get("lastName").value,
        true,
        this.form.get("classrooms").value
      );
    } else if (!this.isLogin && !this.isTeacher) {
      this.authService.register(
        this.form.get("name").value,
        this.form.get("email").value,
        this.form.get("password").value,
        this.form.get("firstName").value,
        this.form.get("lastName").value,
        false,
        this.form.get("classrooms").value,
        this.form.get("teachers").value
      );
    } else {
      this.header = "REGISTER";
      this.isLogin = false;
    }
    this.form.reset();
  }
  login() {
    if (this.isLogin) {
      this.authService.login(
        this.form.get("email").value,
        this.form.get("password").value
      );
    } else {
      this.header = "LOGIN";
      this.isLogin = true;
    }
  }
  registerTeacher(isLogin?: boolean) {
    /* this.utilsService.getClassroom().subscribe(classroom => this.classroomList = classroom)
    this.form = new FormGroup({
      ...this.form.controls,
      classrooms: this.classrooms,

    })
    this.form.addControl('name', new FormControl());
    this.form.addControl('firstName', new FormControl());
    this.form.addControl('lastName', new FormControl())
    this.isTeacher = true;
    this.isLogin = false;
    this.header = 'Register Teacher' */
  }
  registerStudent(isLogin?: boolean) {
    this.form = new FormGroup({
      ...this.form.controls,
      classrooms: this.classrooms,
      teachers: this.teachers,
    });

    this.form.addControl("name", new FormControl());
    this.form.addControl("firstName", new FormControl());
    this.form.addControl("lastName", new FormControl());
    this.isLogin = false;
    this.header = "Register Student";
  }
}
