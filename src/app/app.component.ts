import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "next-day";

  isLogged$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLogged$ = this.authService.isLoggedIn;
  }
}
