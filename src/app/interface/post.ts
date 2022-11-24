import { Student, Teacher } from "./user";

export enum statusPost {
  Do = "DO",
  Correct = "CORRECT",
  Review = "REVIEW",
}

export interface Post {
  teacher: Teacher;
  student: Student;
  title: String;
  message: String;
  createAt: Date;
  status: statusPost;
  subject: String;
}
