import { Classroom } from "./classroom.interface";
import { subject } from "./post.interface";
export interface User {
  readonly _id: String;
  email: String;
  name: String;
  firstName: String;
  lastName: String;
}

export interface Teacher extends User {
  students: Student[];
  classrooms: Classroom[];
}

export interface Student extends User {
  classroom: Classroom;
  teacher: Teacher;
  words: Map<String, Number>;
  subject?: subject[];
}

export interface UserChat {
  fullName: String;
  image?: String;
}
