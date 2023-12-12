import { studentsMock } from "./students";
import { classroomsMock } from "./classrooms";
import { Teacher } from "../models/user.interface";

export const teacherMock: Teacher = {
  _id: "1",
  email: "javitoo.lol@gmail.com",
  name: "Xavi",
  firstName: "Carrasco",
  lastName: "Sanchez",
  students: null,
  classrooms: [classroomsMock[0], classroomsMock[1]],
};
