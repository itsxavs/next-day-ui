import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";
import { Observable } from "rxjs";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "next-day";
  isLogged$: Observable<boolean> = this.tokenStorageService.loggedIn$;
  role$: Observable<string> = this.tokenStorageService.role$;

  constructor(private tokenStorageService: TokenStorageService) {}
}
