import { classroomsMock } from "./classrooms";
import { DetailsStudent, Student } from "../models/user.interface";
import { teacherMock } from "./teachers";
import { subject } from "../models";

export const detailsStudent: DetailsStudent = {
  pronouns: "he/him",
  nameParents: "Juan",
  surnameParents: "Romero Lozano",
  emailParents: "juanrl@gmail.com",
  pronounsParents: "he/him",
  address: "calle Luis Dominguez n12",
  province: "Malaga",
  city: "Malaga",
  zip: "29722",
  phone: "632458234",
  additionalInformation: "Es intolerante a la lactosa",
};
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
    subject: [
      subject.Geography,
      subject.Mathematics,
      subject.Language,
      subject.Science,
    ],
    details: detailsStudent,
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
    subject: [
      subject.Geography,
      subject.Mathematics,
      subject.Language,
      subject.Science,
    ],
    details: detailsStudent,
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
    subject: [
      subject.Geography,
      subject.Mathematics,
      subject.Language,
      subject.Science,
    ],
    details: detailsStudent,
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
    subject: [
      subject.Geography,
      subject.Mathematics,
      subject.Language,
      subject.Science,
    ],
    details: detailsStudent,
  },
];
