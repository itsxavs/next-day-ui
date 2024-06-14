import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Teacher } from "../models/user.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  teacher: Teacher;
  private URL = environment.apiUrl + "messages";
  // recogera todos los mensajes que el profesor tenga de sus estudiantes
  mensajesPendientesTeacher: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  // recogera todos los mensajes que el estudiante tenga de sus profesores
  mensajesPendientesStudent: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  mensajesPendientesTeacher$: Observable<any[]> = this.mensajesPendientesTeacher
    .asObservable()
    .pipe(map((mensajes) => mensajes.filter((m) => !m.leidoTeacher)));
  mensajesPendientesStudent$: Observable<any[]> = this.mensajesPendientesStudent
    .asObservable()
    .pipe(map((mensajes) => mensajes.filter((m) => !m.leidoStudent)));

  constructor(private httpClient: HttpClient) {
    this.mensajesPendientesStudent.subscribe((mensajes) => {
      console.log("mensajes pendientes student", mensajes);
    });
    this.mensajesPendientesTeacher.subscribe((mensajes) => {
      console.log("mensajes pendientes teacher", mensajes);
    });
  }

  getMessages(studentId: string, teacherId: string): Observable<any[]> {
    const params = new HttpParams();
    params.set("studentId", studentId);
    params.set("teacherId", teacherId);
    return this.httpClient.get<any[]>(this.URL, {
      params: {
        teacherId,
        studentId,
      },
    });
  }
  enviarMensaje(mensaje: any) {
    return this.httpClient.post(this.URL, { mensaje });
  }
}
