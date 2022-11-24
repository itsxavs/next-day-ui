import { AuthService } from "./../../services/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() disabled: boolean;

  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(["home"]);
  }
  goWork() {
    this.router.navigate(["works"]);
  }

  goSettings() {
    this.router.navigate(["settings"]);
  }
  goChat() {
    this.router.navigate(["chat"]);
  }

  /* 
  Esto es para cerrar session
  this.authService.logout();
  this.router.navigate(["login"]);
   */
}
