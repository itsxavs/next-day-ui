// socket.service.ts
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { io } from "socket.io-client";
import { AuthService } from "./auth.service";
import { filter, switchMap, tap } from "rxjs/operators";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket;

  //Puedde que pasar logica a app.componet
  constructor(
    private authService: AuthService,
    private mensajesService: MessageService
  ) {
    this.socket = io("http://localhost:3000/chat");
    this.authService._teacherUser
      .pipe(
        filter((user) => !!user),
        tap((teacher) => {
          this.socket.emit("registerUser", `$TEACHER_${teacher.name}`);
          for (let student of teacher.students) {
            this.socket.emit("joinRoom", `${teacher.name}_${student.name}`);
          }
        }),
        switchMap(() => this.receiveMessage()),
        tap((message: any) =>
          this.mensajesService.mensajesPendientesTeacher.next([
            ...this.mensajesService.mensajesPendientesTeacher.value,
            message,
          ])
        )
      )
      .subscribe();
    this.authService._studentUser
      .pipe(
        filter((user) => !!user),
        tap((student) => {
          this.socket.emit("registerstudent", `STUDENT_${student.name}`);
          for (let teacher of student.teachers) {
            this.socket.emit("joinRoom", `${teacher.name}_${student.name}`);
          }
        }),
        switchMap(() => this.receiveMessage()),
        tap((message: any) =>
          this.mensajesService.mensajesPendientesStudent.next([
            ...this.mensajesService.mensajesPendientesStudent.value,
            message,
          ])
        )
      )
      .subscribe();
  }

  joinRoom(room: string) {
    this.socket.emit("joinRoom", room);
  }

  leaveRoom(room: string) {
    this.socket.emit("leaveRoom", room);
  }

  sendMessage(message: any, room: string, sender: string) {
    const messagec = { sender: sender, room: room, message: message };
    this.socket.emit("chatToServer", messagec);
  }

  receiveMessage() {
    return new Observable((observer) => {
      this.socket.on("chatToClient", (message) => {
        observer.next(message);
      });
    });
  }
}
