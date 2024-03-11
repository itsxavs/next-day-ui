import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Teacher } from "../models/user.interface";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
const TEACHER_KEY = "auth-teacher";
const STUDENT_KEY = "auth-student";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  _role$: BehaviorSubject<string> = new BehaviorSubject(null);
  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn$.asObservable();
  role$: Observable<string> = this._role$.asObservable();
  private _sessionCleared$ = new Subject<void>();
  sessionCleared$ = this._sessionCleared$.asObservable();
  constructor() {
    this._role$.next(this.getUser().role);
    this._loggedIn$.next(!!this.getUser());
  }

  signOut(): void {
    window.sessionStorage.clear();
    this._role$.next(null);
    this._loggedIn$.next(false);
    this._sessionCleared$.next();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this._role$.next(user.role);
    this._loggedIn$.next(true);
  }
  public saveTeacher(user: any): void {
    window.sessionStorage.removeItem(TEACHER_KEY);
    window.sessionStorage.setItem(TEACHER_KEY, JSON.stringify(user));
  }
  public saveStudent(user: any): void {
    window.sessionStorage.removeItem(STUDENT_KEY);
    window.sessionStorage.setItem(STUDENT_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
  public getTeacher(): any {
    const user = window.sessionStorage.getItem(TEACHER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
  public getStudent(): any {
    const user = window.sessionStorage.getItem(STUDENT_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
}
