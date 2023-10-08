import { classroomsMock } from "./classrooms";
import { Student } from "../core/models/user.interface";
import { teacherMock } from "./teachers";

export const studentsMock: Student[] = [
  {
    _id: "2",
    email: "hector@gmail.com",
    name: "Hector",
    firstName: "Hernandez",
    lastName: "Muñoz",
    classroom: classroomsMock[0],
    teacher: teacherMock,
    words: new Map<String, Number>(),
  },
  {
    _id: "3",
    email: "nur@gmail.com",
    name: "Nur",
    firstName: "Jorquera",
    lastName: "Trascastro",
    classroom: classroomsMock[0],
    teacher: teacherMock,
    words: new Map<String, Number>(),
  },
  {
    _id: "4",
    email: "julio@gmail.com",
    name: "Julio",
    firstName: "Merida",
    lastName: "Hoyos",
    classroom: classroomsMock[0],
    teacher: teacherMock,
    words: new Map<String, Number>(),
  },
  {
    _id: "5",
    email: "jesus@gmail.com",
    name: "Jesus",
    firstName: "Marin",
    lastName: "Garcia",
    classroom: classroomsMock[0],
    teacher: teacherMock,
    words: new Map<String, Number>(),
  },
];
