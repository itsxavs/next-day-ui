import { Classroom } from "./../interface/utils";
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  private uri = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) {}

  getClassroom() {
    return this.httpClient.get(this.uri + "classroom").pipe(
      map((classrooms: any) => {
        return classrooms.map((classroom: Classroom) => {
          return {
            _id: classroom._id,
            letter: classroom.letter,
            number: classroom.number,
          } as Classroom;
        });
      })
    );
  }
}
