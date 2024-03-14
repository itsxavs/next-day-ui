import { MessageChat } from "../../models/message.interface";
import { Student, Teacher, UserChat } from "../../models/user.interface";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { messageChatMock, userChatMock } from "src/app/mocks/mix";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { FormControl } from "@angular/forms";
import { message } from "../../mocks/message";
import { MessageService } from "src/app/services/message.service";
import { filter, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { SocketService } from "src/app/services/socket.service";

const mensajeStudent = {
  student: "student_1",
  teacher: "teacher_1",
  message: "Hola",
  date: new Date(),
  leidoTeacher: false,
  leidoStudent: false,
  role: "STUDENT",
};
const mensajeTeacher = {
  student: "student_1",
  teacher: "teacher_1",
  message: "me cago en todo",
  date: new Date(),
  leidoTeacher: false,
  leidoStudent: false,
  role: "TEACHER",
};

const MESSAGES = [mensajeStudent, mensajeTeacher];

@Component({
  selector: "app-chat-room",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.scss"],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  users: UserChat[] = userChatMock;
  messages: MessageChat[] = messageChatMock;
  teacher$: Observable<Teacher> = this.authService._teacherUser;
  student$: Observable<Student> = this.authService._studentUser;
  selectedStudent: Student;
  selectedTeacher: Teacher;
  role: string = this.authService._userSelection.value.role;
  mensajes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  newMensajeForm: FormControl = new FormControl();
  teacherId: string;
  studentId: string;
  mensajeEnviado: any;

  destroyChat$: Subject<boolean>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private socketService: SocketService
  ) {
    if (this.role === "TEACHER") {
      this.teacher$
        .pipe(
          takeUntil(this.destroy$),
          filter((user) => !!user)
        )
        .subscribe((teacher) => {
          this.selectedStudent = teacher.students[0];
        });
    } else if (this.role === "STUDENT") {
      this.student$
        .pipe(
          takeUntil(this.destroy$),
          filter((user) => !!user)
        )
        .subscribe((student) => {
          this.selectedTeacher = student.teachers[0];
        });
    }
  }

  @ViewChild("chatHistory", { static: false })
  private chatContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop =
      this.chatContainer.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.destroyChat$ = new Subject<boolean>();

    if (this.role === "TEACHER") {
      this.teacherId = this.authService._teacherUser.value._id;
      this.messageService
        .getMessages(this.selectedStudent._id, this.teacherId)
        .pipe(
          takeUntil(this.destroyChat$),
          tap((mensajes) => this.mensajes.next(mensajes))
        )
        .subscribe();

      this.messageService.mensajesPendientesTeacher$
        .pipe(
          filter((mensajes) => !!mensajes.length),
          map((mensajes: any[]) =>
            mensajes.filter(
              (mensaje) => mensaje.student === this.selectedStudent._id
            )
          ),
          map((mensajes: any[]) =>
            mensajes.map((m) => {
              m.leidoTeacher = true;
              return m;
            })
          ),
          tap((mensajes) =>
            this.mensajes.next([
              ...this.mensajes.value.filter((m) => m.leidoTeacher),
              ...mensajes,
            ])
          )
        )
        .subscribe();
    } else if (this.role === "STUDENT") {
      this.student$ = this.authService._studentUser;
      this.studentId = this.authService._studentUser.value._id;
      this.messageService
        .getMessages(this.studentId, this.selectedTeacher._id)
        .pipe(
          takeUntil(this.destroyChat$),
          tap((mensajes) => this.mensajes.next(mensajes))
          // switchMap(() => this.messageService.mensajesPendientesStudent),
          // map((mensajes: any[]) =>
          //   mensajes.filter(
          //     (mensaje) => mensaje.teacher === this.selectedTeacher._id
          //   )
          // ),
          // tap((mensajes) =>
          //   this.mensajes.next([...this.mensajes.value, ...mensajes])
          // )
        )
        .subscribe();

      this.messageService.mensajesPendientesStudent$
        .pipe(
          filter((mensajes) => !!mensajes.length),
          map((mensajes: any[]) =>
            mensajes.filter(
              (mensaje) => mensaje.teacher === this.selectedTeacher._id
            )
          ),
          map((mensajes: any[]) =>
            mensajes.map((m) => {
              m.leidoStudent = true;
              return m;
            })
          ),
          tap((mensajes) =>
            this.mensajes.next([
              ...this.mensajes.value.filter((m) => m.leidoStudent),
              ...mensajes,
            ])
          )
        )
        .subscribe();
    }
    this.student$.pipe(takeUntil(this.destroy$)).subscribe((student) => {
      console.log(student);
    });
  }

  ngOnDestroy(): void {
    this.destroyChat$.next(true);
    this.destroyChat$.complete();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    this.destroyChat$.next(true);
    this.destroyChat$.complete();
    this.ngOnInit();
  }
  selectTeacher(teacher: Teacher) {
    this.selectedTeacher = teacher;
    this.destroyChat$.next(true);
    this.destroyChat$.complete();
    this.ngOnInit();
  }

  enviar() {
    if (this.role === "TEACHER") {
      const mensaje = {
        student: this.selectedStudent._id,
        teacher: this.teacherId,
        message: this.newMensajeForm.value,
        date: new Date(),
        leidoTeacher: true,
        leidoStudent: false,
        role: this.role,
      };
      // this.mensajes.push(mensaje);
      this.newMensajeForm.setValue("");
      this.messageService
        .enviarMensaje(mensaje)
        .pipe(takeUntil(this.destroyChat$))
        .subscribe((mensaje) =>
          this.mensajes.next([...this.mensajes.value, mensaje])
        );
      this.socketService.sendMessage(
        mensaje,
        `${this.authService._teacherUser.value.name}_${this.selectedStudent.name}`,
        `${this.authService._teacherUser.value._id}`
        // `$TEACHER_${this.authService._teacherUser.value.name}`
      );
      // this.messageService
      //   .getMessages(this.selectedStudent._id, this.teacherId)
      //   .subscribe((mensaje) => {
      //     this.mensajes.next([this.mensajes.value, mensaje]);
      //   });
    }
    if (this.role === "STUDENT") {
      const mensaje = {
        student: this.studentId,
        teacher: this.selectedTeacher._id,
        message: this.newMensajeForm.value,
        date: new Date(),
        leidoTeacher: false,
        leidoStudent: true,
        role: this.role,
      };
      // this.mensajes.push(mensaje);
      this.newMensajeForm.setValue("");
      this.messageService
        .enviarMensaje(mensaje)
        .pipe(takeUntil(this.destroyChat$))
        .subscribe((mensaje) =>
          this.mensajes.next([...this.mensajes.value, mensaje])
        );
      this.socketService.sendMessage(
        mensaje,
        `${this.selectedTeacher.name}_${this.authService._studentUser.value.name}`,
        `${this.authService._studentUser.value._id}`
        // `STUDENT_${this.authService._studentUser.value.name}`
      );
      // this.messageService
      //   .getMessages(this.studentId, this.selectedTeacher._id)
      //   .subscribe((mensaje) => {
      //     this.mensajes.next([this.mensajes.value, mensaje]);
      //   });
    }
  }

  getPhotoPerfil(name: string) {
    return `../../../assets/img/${name}.jpg`;
  }
}
