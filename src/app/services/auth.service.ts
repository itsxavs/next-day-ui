import { catchError, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Student, Teacher, User } from "../models/user.interface";
import { PATH_API } from "../models/path-api.constant";

const AUTH_API = "http://localhost:3000/auth/";
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
  private uri = "http://localhost:3000/";

  private _userSelection = new BehaviorSubject<any>(null);
  private _studentUser = new BehaviorSubject<Student>(null);
  private _teacherUser = new BehaviorSubject<Teacher>(null);

  userSelection$: Observable<any> = this._userSelection.asObservable();

  teacher: Teacher;
  student: Student;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + "signIn",
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        switchMap(({ token, user }: { token: string; user: User }) => {
          if (user.role === "ROLE_STUDENT") {
            return this.http.get(`${AUTH_API}students${user._id}`);
          } else {
            return this.http.get(`${AUTH_API}teacher${user._id}`);
          }
        }),
        tap((user) => this._userSelection.next(user?.user))
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

  editUser(userId, user) {
    return this.http.post(`${AUTH_API}modify`, {
      userId,
      user,
    });
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
}
