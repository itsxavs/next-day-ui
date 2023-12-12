import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() role: string;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(["home"]);
  }
  goProfile() {
    this.router.navigate(["profile"]);
  }
  goManage() {
    this.router.navigate(["manage"]);
  }
  goSettings() {
    this.router.navigate(["settings"]);
  }
  goChat() {
    this.router.navigate(["chat"]);
  }

  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(["login"]);
  }

  /* 
  Esto es para cerrar session
  this.authService.logout();
  this.router.navigate(["login"]);
   */
}
