import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/services/students.service";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnInit {
  students = this.studentService.getStudentsByTeacher();

  constructor(private readonly studentService: StudentService) {}

  ngOnInit(): void {}
}
