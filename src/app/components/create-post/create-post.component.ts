import { message } from "./../../mocks/message";
import { PostService } from "./../../services/post.service";
import { StudentService } from "./../../services/students.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/user.interface";
import { subject } from "src/app/models";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
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

  students: Observable<Student[]>;

  constructor(
    private readonly studentService: StudentService,
    private readonly postService: PostService
  ) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudentsByTeacher();
  }
  create() {
    this.postService.createPost(this.form.value);
  }
}
