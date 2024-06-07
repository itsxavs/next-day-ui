import { HttpParams } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resultado, ResultadoGeneral } from "../models/ranking.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models";

@Injectable({
  providedIn: "root",
})
export class RankingService {
  private URL = "http://localhost:3000";
  students: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) {}

  addCalificacion(postId: string, calificacion: string) {
    return this.http.post(this.URL + "/calificacion/add", {
      postId,
      calificacion,
    });
  }
  getCalificacionesAlumno(studentId: string): Observable<Resultado> {
    let queryParams = new HttpParams().append("studentId", studentId);
    return this.http.get<Resultado>(this.URL + "/calificacion/alumno", {
      params: queryParams,
    });
  }
  getCalificacionesAlumnos(
    studentIds: string[]
  ): Observable<ResultadoGeneral[]> {
    return this.http.post<ResultadoGeneral[]>(
      this.URL + "/calificaciones/alumnos",
      studentIds
    );
  }

  getStudents(): void {
    this.http.get<Student[]>(this.URL + "/students").subscribe((students) => {
      this.students.next(students);
    });
  }
}
