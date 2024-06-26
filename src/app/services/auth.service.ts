import { catchError, concatMap, switchMap, tap } from "rxjs/operators";
import { HostListener, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Student, Teacher, User } from "../models/user.interface";
import { PATH_API } from "../models/path-api.constant";
import { TokenStorageService } from "./token-storage.service";
import { environment } from "src/environments/environment";

const path = "http://localhost:3000/auth/";
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
  private URL = `${environment.apiUrl}auth/`;
  _userSelection = new BehaviorSubject<any>(null);
  _studentUser = new BehaviorSubject<Student>(null);
  _teacherUser = new BehaviorSubject<Teacher>(null);

  userSelection$: Observable<any> = this._userSelection.asObservable();

  teacher: Teacher;
  student: Student;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    if (this.tokenStorageService.getUser()) {
      this._userSelection.next(this.tokenStorageService.getUser());
      this.tokenStorageService.getUser().role === "TEACHER"
        ? this._teacherUser.next(this.tokenStorageService.getTeacher())
        : this._studentUser.next(this.tokenStorageService.getStudent());
    }
    this.tokenStorageService.sessionCleared$.subscribe(() => {
      this._userSelection.next(null);
      this._studentUser.next(null);
      this._teacherUser.next(null);
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        this.URL + "signIn",
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        // concatMap(({ token, user }: { token: string; user: User }) => {
        // if (user.role === "STUDENT") {
        // return this.http.get(`${this.uri}students/${user._id}`);
        // } else {
        // return this.http.get(`${this.uri}teacher/${user._id}`);
        // }
        // }),
        tap(({ user, student, token, teacher }) => {
          if (student) this._studentUser.next(student);
          if (user) this._userSelection.next(user);
          if (teacher) this._teacherUser.next(teacher);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.URL + "signup",
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  editUser(userId, user) {
    return this.http.post(`${this.URL}modify`, {
      userId,
      user,
    });
  }
  // get isLoggedIn() {
  //   return this.LoggedIn.asObservable();
  // }

  // register(
  //   name: string,
  //   email: string,
  //   password: string,
  //   firstName: string,
  //   lastName: string,
  //   teacher: boolean,
  //   classrooms: string[],
  //   teachers?: string
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
  //           words: new Map<string, Number>(),
  //         } as Student;
  //       }
  //       localStorage.setItem("auth_token", res.token);
  //       this.LoggedIn.next(true);
  //       this._userSelection.next(res.userRole);
  //     });
  // }

  // login(email: string, password: string) {
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
