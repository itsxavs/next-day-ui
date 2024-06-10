import { HttpParams } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Calificaciones,
  Resultado,
  ResultadoGeneral,
} from "../models/ranking.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RankingService {
  private URL = "http://localhost:3000/post";
  students: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) {}

  addCalificacion(postId: string, calificacion: Calificaciones) {
    return this.http.post(this.URL + "/calificacion/add", {
      postId,
      calificacion,
    });
  }
  getCalificacionesAlumno(studentId: string): Observable<Resultado> {
    let queryParams = new HttpParams().append("studentId", studentId);
    return this.http
      .get<Resultado>(this.URL + "/calificacion/alumno", {
        params: queryParams,
      })
      .pipe(tap((c) => console.log(c)));
  }
  getCalificacionesAlumnos(
    studentIds: string[]
  ): Observable<ResultadoGeneral[]> {
    return this.http
      .post<ResultadoGeneral[]>(
        this.URL + "/calificaciones/alumnos",
        studentIds
      )
      .pipe(
        map((resultado) => [
          ...resultado,
          ...resultado,
          ...resultado,
          ...resultado,
        ]),
        tap((c) => console.log(c))
      );
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:3000/students");
  }
}
