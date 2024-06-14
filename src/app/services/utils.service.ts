import { classroomsMock } from "./../mocks/classrooms";
import { Classroom } from "../models/classroom.interface";
import { map, mapTo, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  private uri = "http://localhost:3000/";
  private URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getClassroom() {
    return this.httpClient.get(this.URL + "classroom").pipe(
      map((classrooms: any) => {
        return classrooms.map((classroom: Classroom) => {
          return {
            letter: classroom.letter,
            number: classroom.number,
          } as Classroom;
        });
      }),
      mapTo(classroomsMock)
    );
  }
}
