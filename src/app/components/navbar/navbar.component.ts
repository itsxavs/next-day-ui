import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() role: string;
  user$ = this.user._userSelection;
  active: string = "home";

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private user: AuthService
  ) {}

  ngOnInit() {
    const fullUrl = window.location.href;
    if (fullUrl.includes("home")) this.active = "home";
    if (fullUrl.includes("profile")) this.active = "profile";
    if (fullUrl.includes("manage")) this.active = "manage";
    if (fullUrl.includes("chat")) this.active = "chat";
    if (fullUrl.includes("ranking")) this.active = "ranking";
  }

  goHome() {
    this.active = "home";
    this.router.navigate(["home"]);
  }
  goProfile() {
    this.active = "profile";
    this.router.navigate(["profile"]);
  }
  goManage() {
    this.active = "manage";
    this.router.navigate(["manage"]);
  }

  goChat() {
    this.active = "chat";
    this.router.navigate(["chat"]);
  }

  logOut() {
    this.active = "home";
    this.router.navigate(["login"]);
    this.tokenStorage.signOut();
  }
  ranking() {
    this.active = "ranking";
    this.router.navigate(["ranking"]);
  }

  getPhotoPerfil(name: string) {
    return `../../../assets/img/${name}.jpg`;
  }

  /* 
  Esto es para cerrar session
  this.authService.logout();
  this.router.navigate(["login"]);
   */
}
