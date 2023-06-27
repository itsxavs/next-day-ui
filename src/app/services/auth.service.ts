import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Student, Teacher } from "../core/models/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private uri = "http://localhost:5000/";
  private _userSelection = new BehaviorSubject<any>(null);
  private LoggedIn = new BehaviorSubject<boolean>(false);
  userSelection$ = this._userSelection.asObservable();
  teacher: Teacher;
  student: Student;

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn() {
    return this.LoggedIn.asObservable();
  }

  register(
    name: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    teacher: boolean,
    classrooms: String[],
    teachers?: String
  ) {
    this.http
      .post(this.uri + "users/signup", {
        name: name,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        teacher: teacher,
        classrooms: classrooms,
        teachers: teachers,
      })
      .subscribe((res: any) => {
        this.router.navigate(["home"]);
        localStorage.setItem("auth_token", res.token);
        if (teacher) {
          this.teacher = {
            _id: res.userRole.idUser,
            name: res.userRole.name,
            email: res.userRole.email,
            firstName: res.userRole.firstName,
            lastName: res.userRole.lastName,
            classrooms: [...res.userRole.classrooms],
            students: [],
          } as Teacher;
        } else {
          this.student = {
            _id: res.userRole.idUser,
            name: res.userRole.name,
            email: res.userRole.email,
            firstName: res.userRole.firstName,
            lastName: res.userRole.lastName,
            classroom: res.userRole.classrooms,
            teacher: res.userRole.teacher,
            words: new Map<String, Number>(),
          } as Student;
        }
        localStorage.setItem("auth_token", res.token);
        this.LoggedIn.next(true);
        this._userSelection.next(res.userRole);
      });
  }

  login(email: String, password: String) {
    this.http
      .post(this.uri + "users/signin", { email: email, password: password })
      .subscribe((res: any) => {
        this.router.navigate(["home"]);
        localStorage.setItem("auth_token", res.token);
        this.LoggedIn.next(true);
        this._userSelection.next(res.userRole);
      });
  }

  logout() {
    localStorage.removeItem("auth_token");
    this.router.navigate(["login"]);
  }
}
