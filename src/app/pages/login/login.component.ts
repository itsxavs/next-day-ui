import { Classroom } from "../../core/models/classroom.interface";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Teacher, User } from "src/app/core/models/user.interface";
import { TeacherService } from "src/app/services/teacher.service";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "../../services/auth.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router } from "@angular/router";

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
    username: new FormControl(),
    password: new FormControl(),
  });
  roles = "";
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.utilsService
    //   .getClassroom()
    //   .subscribe((classrooms) => (this.classroomList = classrooms));
    // this.teacherService
    //   .getTeachers()
    //   .subscribe((teachers) => (this.teacherList = teachers));
  }

  onSubmit(): void {
    this.authService
      .login(this.form.get("username").value, this.form.get("password").value)
      .subscribe(
        (data) => {
          if (typeof data === "string") {
            this.form.reset();
          } else {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);

            this.roles = this.tokenStorage.getUser().roles;
            this.reloadPage();
          }
        },
        (err) => {
          this.errorMessage = err.error.message;
        }
      );
  }
  reloadPage(): void {
    this.router.navigate(["home"]);
  }

  // register() {
  //   if (!this.isLogin && this.isTeacher) {
  //     this.authService.register(
  //       this.form.get("name").value,
  //       this.form.get("email").value,
  //       this.form.get("password").value,
  //       this.form.get("firstName").value,
  //       this.form.get("lastName").value,
  //       true,
  //       this.form.get("classrooms").value
  //     );
  //   } else if (!this.isLogin && !this.isTeacher) {
  //     this.authService.register(
  //       this.form.get("name").value,
  //       this.form.get("email").value,
  //       this.form.get("password").value,
  //       this.form.get("firstName").value,
  //       this.form.get("lastName").value,
  //       false,
  //       this.form.get("classrooms").value,
  //       this.form.get("teachers").value
  //     );
  //   } else {
  //     this.header = "REGISTER";
  //     this.isLogin = false;
  //   }
  //   this.form.reset();
  // }
  // login() {
  //   if (this.isLogin) {
  //     this.authService.login(
  //       this.form.get("email").value,
  //       this.form.get("password").value
  //     );
  //   } else {
  //     this.header = "LOGIN";
  //     this.isLogin = true;
  //   }
  // }
  // registerTeacher(isLogin?: boolean) {
  //   this.utilsService.getClassroom().subscribe(classroom => this.classroomList = classroom)
  //   this.form = new FormGroup({
  //     ...this.form.controls,
  //     classrooms: this.classrooms,

  //   })
  //   this.form.addControl('name', new FormControl());
  //   this.form.addControl('firstName', new FormControl());
  //   this.form.addControl('lastName', new FormControl())
  //   this.isTeacher = true;
  //   this.isLogin = false;
  //   this.header = 'Register Teacher'
  // }
  // registerStudent(isLogin?: boolean) {
  //   this.form = new FormGroup({
  //     ...this.form.controls,
  //     classrooms: this.classrooms,
  //     teachers: this.teachers,
  //   });

  //   this.form.addControl("name", new FormControl());
  //   this.form.addControl("firstName", new FormControl());
  //   this.form.addControl("lastName", new FormControl());
  //   this.isLogin = false;
  //   this.header = "Register Student";
  // }
}
