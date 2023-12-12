import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  private _role$: BehaviorSubject<string> = new BehaviorSubject(null);
  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn$.asObservable();
  role$: Observable<string> = this._role$.asObservable();
  constructor() {
    this._role$.next(this.getUser().role);
    this._loggedIn$.next(!!this.getUser());
  }

  signOut(): void {
    window.sessionStorage.clear();
    this._role$.next(null);
    this._loggedIn$.next(false);
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

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return "";
  }
}
