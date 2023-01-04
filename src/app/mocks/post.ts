import { Post, statusPost } from "../interface/post";
import { studentsMock } from "./students";
import { teacherMock } from "./teachers";

export const PostsMock_1_2: Post[] = [
  {
    title: "mek",
    message: "pues eso que estamos aquii",
    subject: "MATHS",
    teacher: teacherMock,
    student: studentsMock[0],
    createAt: new Date(),
    status: statusPost.Correct,
  },
  {
    title: "two",
    subject: "math",
    message: "pues eso que estamos aquii",
    teacher: teacherMock,
    student: studentsMock[0],
    createAt: new Date(),
    status: statusPost.Correct,
  },
  {
    title: "three",
    subject: "biology",
    message:
      "pues eso que estamos aquii, pues te cuento mas para ver como se sale los matrgendes si se extiende soto demasiao",
    teacher: teacherMock,
    student: studentsMock[0],
    createAt: new Date(),
    status: statusPost.Correct,
  },
  {
    title: "four",
    subject: "music",
    message: "pues eso que estamos aquii, habra qeyu poner un maximo de ",
    teacher: teacherMock,
    student: studentsMock[0],
    createAt: new Date(),
    status: statusPost.Correct,
  },
  {
    title: "five",
    subject: "plactic",
    message: "pues es",
    teacher: teacherMock,
    student: studentsMock[0],
    createAt: new Date(),
    status: statusPost.Correct,
  },
];
