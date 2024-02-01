import { MessageChat } from "../models/message.interface";
import { Post, statusPost, subject } from "../models/post.interface";
import { Teacher, UserChat } from "../models/user.interface";
import { Classroom } from "../models/classroom.interface";
import { Student } from "../models/user.interface";

const classroomMock: Classroom = {
  letter: "A",
  number: 1,
};

const teacherMock1: Teacher = {
  _id: "mek",
  email: "mek",
  name: "Juan",
  firstname: "mek",
  lastname: "mek",
  classrooms: [classroomMock],
  students: [],
};

const studentMock: Student = {
  _id: "mek",
  email: "mek",
  name: "mek",
  firstname: "mek",
  lastname: "mek",
  classroom: classroomMock,
  teacher: teacherMock1,
  words: new Map<string, Number>(),
};
const noticesMock: Post[] = [
  {
    title: "mek",
    message: "pues eso que estamos aquii",
    subject: subject.Mathematics,
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Done,
    classroom: { letter: "B", number: 1 },
  } as Post,
  {
    title: "two",
    subject: subject.Mathematics,
    message: "pues eso que estamos aquii",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Do,
    classroom: { letter: "A", number: 2 },
  } as Post,
  {
    title: "three",
    subject: subject.Science,
    message:
      "pues eso que estamos aquii, pues te cuento mas para ver como se sale los matrgendes si se extiende soto demasiao",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Review,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "four",
    subject: subject.Geography,
    message: "pues eso que estamos aquii, habra qeyu poner un maximo de ",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Done,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "five",
    subject: subject.Language,
    message: "pues es",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Do,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "five",
    subject: subject.Mathematics,
    message: "pues es",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Review,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "five",
    subject: subject.Science,
    message: "pues es",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Done,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "five",
    subject: subject.Language,
    message: "pues es",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Done,
    classroom: { letter: "A", number: 1 },
  } as Post,
];
const userChatMock: UserChat[] = [
  {
    fullName: "Javier Carrasco Sanchez",
  },
  {
    fullName: "Javier Carrasco Sanchez",
  },
  {
    fullName: "Javier Carrasco Sanchez",
  },
  {
    fullName: "Javier Carrasco Sanchez",
  },
  {
    fullName: "Javier Carrasco Sanchez",
  },
  {
    fullName: "Javier Carrasco Sanchez",
  },
];

const messageChatMock: MessageChat[] = [
  {
    message: "eso eso eso eso",
    right: true,
  },
  {
    message: "eso eso eso eso",
    right: false,
  },
  {
    message: "eso eso eso eso",
    right: true,
  },
  {
    message: "eso eso eso eso",
    right: true,
  },
  {
    message: "eso eso eso eso",
    right: true,
  },
  {
    message: "eso eso eso eso",
    right: false,
  },
  {
    message: "eso eso eso eso",
    right: false,
  },
  {
    message: "eso eso eso eso",
    right: true,
  },
];

export {
  classroomMock,
  teacherMock1,
  studentMock,
  noticesMock,
  userChatMock,
  messageChatMock,
};
