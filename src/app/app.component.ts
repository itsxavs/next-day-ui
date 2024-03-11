import { Router } from "@angular/router";
import { TokenStorageService } from "./services/token-storage.service";
import { Observable } from "rxjs";
import { Component } from "@angular/core";
import { SocketService } from "./services/socket.service";
import { MessageService } from "./services/message.service";
import { message } from "./mocks/message";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "next-day";
  isLogged$: Observable<boolean> = this.tokenStorageService.loggedIn$;
  role$: Observable<string> = this.tokenStorageService.role$;

  constructor(
    private tokenStorageService: TokenStorageService,
    private socket: SocketService
  ) {
    // this.socket.joinRoom("room1");
    // this.socket.receiveMessage().subscribe((message) => {
    //   console.log(message);
    // });
    // this.socket.sendMessage("Hello");
    // this.socket.receiveMessage().subscribe((message: any) => {
    //   if (tokenStorageService._role$.value === "TEACHER") {
    //     this.mensajesService.mensajesPendientesTeacher.next([
    //       ...this.mensajesService.mensajesPendientesTeacher.value,
    //       message.message,
    //     ]);
    //   } else if (tokenStorageService._role$.value === "STUDENT") {
    //     this.mensajesService.mensajesPendientesStudent.next([
    //       ...this.mensajesService.mensajesPendientesStudent.value,
    //       message.message,
    //     ]);
    //   }
    // });
  }
}
