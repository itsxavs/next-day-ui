import { message } from "./../../mocks/message";
import { PostService } from "./../../services/post.service";
import { StudentService } from "./../../services/students.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { Student, Teacher } from "src/app/models/user.interface";
import { subject } from "src/app/models";
import { Classroom } from "../../models/classroom.interface";
import { CLASSROOMS } from "src/app/models/classroom.constant";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
  @Input() teacher: Teacher;
  classrooms: Classroom[] = CLASSROOMS;
  subjects = [
    subject.Geography,
    subject.Language,
    subject.Mathematics,
    subject.Science,
  ];
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    teacher: new FormControl(),
    students: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
    file: new FormControl(),
  });

  students: Student[];

  constructor(
    private readonly studentService: StudentService,
    private readonly postService: PostService
  ) {}

  ngOnInit(): void {
    this.students = this.teacher.students;
  }
  create() {
    const file = this.form.get("file").value;
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      this.postService.createPost(this.form.value, buffer);
    };
    reader.onerror = (error) => {
      console.log("Error reading file:", error);
    };
  }
}
