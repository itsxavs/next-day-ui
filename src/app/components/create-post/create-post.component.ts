import { StudentService } from "./../../services/students.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/core/models/user.interface";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    autor: new FormControl(),
    students: new FormControl(),
    subject: new FormControl(),
    description: new FormControl(),
    type: new FormControl(),
  });

  students: Observable<Student[]>;

  constructor(private readonly studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudentsByTeacher();
  }
}
