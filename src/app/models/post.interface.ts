import { Classroom } from "./classroom.interface";
import { Student, Teacher } from "./user.interface";

export enum statusPost {
  Do = "DO",
  Done = "DONE",
  Review = "REVIEW",
}

export enum subject {
  Mathematics = "Mathematics",
  Science = "SCIENCE",
  Language = "LANGUAGE",
  Geography = "GEOGRAPHY",
}

export interface Post {
  _id?: string;
  teacher: Teacher;
  student: Student;
  title: string;
  message: string;
  createAt: Date;
  status: statusPost;
  subject: subject | string;
  classroom?: Classroom;
  file?: string;
}
