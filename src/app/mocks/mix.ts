import { MessageChat } from "../core/models/message.interface";
import { Post, statusPost, subject } from "../core/models/post.interface";
import { Teacher, UserChat } from "../core/models/user.interface";
import { Classroom } from "../core/models/classroom.interface";
import { Student } from "../core/models/user.interface";

const classroomMock: Classroom = {
  letter: "A",
  number: 1,
};

const teacherMock1: Teacher = {
  _id: "mek",
  email: "mek",
  name: "Juan",
  firstName: "mek",
  lastName: "mek",
  classrooms: [classroomMock],
  students: [],
};

const studentMock: Student = {
  _id: "mek",
  email: "mek",
  name: "mek",
  firstName: "mek",
  lastName: "mek",
  classroom: classroomMock,
  teacher: teacherMock1,
  words: new Map<String, Number>(),
};
const noticesMock: Post[] = [
  {
    title: "mek",
    message: "pues eso que estamos aquii",
    subject: subject.Mathematics,
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Correct,
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
    status: statusPost.Correct,
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
    status: statusPost.Correct,
    classroom: { letter: "A", number: 1 },
  } as Post,
  {
    title: "five",
    subject: subject.Language,
    message: "pues es",
    teacher: teacherMock1,
    student: studentMock,
    createAt: new Date(),
    status: statusPost.Correct,
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
