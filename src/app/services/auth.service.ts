import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Student, Teacher } from "../core/models/user.interface";

const AUTH_API = "http://localhost:8080/api/auth/";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

const student = {
  username: "student_1",
  passwword: "dfdsfsdfds",
  roles: "ROLE_STUDENT",
};
const teacher = {
  username: "teacher_1",
  passwword: "dfdsfsdfds",
  roles: "ROLE_TEACHER",
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private uri = "http://localhost:5000/";
  private _userSelection = new BehaviorSubject<any>(null);

  teacher: Teacher;
  student: Student;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + "signin",
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        catchError(() => {
          let user;
          if (username === "student_1") {
            user = of(student);
            // this._loggedIn.next(true);
          } else if (username === "teacher_1") {
            user = of(teacher);
            // this._loggedIn.next(true);
          } else {
            user = of("prueba otra vez");
            // this._loggedIn.next(false);
          }
          return user;
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
  // get isLoggedIn() {
  //   return this.LoggedIn.asObservable();
  // }

  // register(
  //   name: String,
  //   email: String,
  //   password: String,
  //   firstName: String,
  //   lastName: String,
  //   teacher: boolean,
  //   classrooms: String[],
  //   teachers?: String
  // ) {
  //   this.http
  //     .post(this.uri + "users/signup", {
  //       name: name,
  //       email: email,
  //       password: password,
  //       firstName: firstName,
  //       lastName: lastName,
  //       teacher: teacher,
  //       classrooms: classrooms,
  //       teachers: teachers,
  //     })
  //     .subscribe((res: any) => {
  //       this.router.navigate(["home"]);
  //       localStorage.setItem("auth_token", res.token);
  //       if (teacher) {
  //         this.teacher = {
  //           _id: res.userRole.idUser,
  //           name: res.userRole.name,
  //           email: res.userRole.email,
  //           firstName: res.userRole.firstName,
  //           lastName: res.userRole.lastName,
  //           classrooms: [...res.userRole.classrooms],
  //           students: [],
  //         } as Teacher;
  //       } else {
  //         this.student = {
  //           _id: res.userRole.idUser,
  //           name: res.userRole.name,
  //           email: res.userRole.email,
  //           firstName: res.userRole.firstName,
  //           lastName: res.userRole.lastName,
  //           classroom: res.userRole.classrooms,
  //           teacher: res.userRole.teacher,
  //           words: new Map<String, Number>(),
  //         } as Student;
  //       }
  //       localStorage.setItem("auth_token", res.token);
  //       this.LoggedIn.next(true);
  //       this._userSelection.next(res.userRole);
  //     });
  // }

  // login(email: String, password: String) {
  //   this.http
  //     .post(this.uri + "users/signin", { email: email, password: password })
  //     .subscribe((res: any) => {
  //       this.router.navigate(["home"]);
  //       localStorage.setItem("auth_token", res.token);
  //       this.LoggedIn.next(true);
  //       this._userSelection.next(res.userRole);
  //     });
  // }

  // logout() {
  //   localStorage.removeItem("auth_token");
  //   this.router.navigate(["login"]);
  // }
}
