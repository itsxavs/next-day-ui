import { Classroom } from "./classroom.interface";
import { subject } from "./post.interface";
export interface User {
  readonly _id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface Teacher extends User {
  students: Student[];
  classrooms: Classroom[];
}

export interface Student extends User {
  classroom: Classroom;
  teacher?: Teacher;
  words?: Map<string, Number>;
  subject?: subject[];
  details?: DetailsStudent;
}

export interface UserChat {
  fullName: string;
  image?: string;
}

export interface DetailsStudent {
  _id?: string;
  pronouns: string;
  nameParents: string;
  surnameParents: string;
  emailParents: string;
  pronounsParents: string;
  address: string;
  province: string;
  city: string;
  zip: string;
  phone: string;
  additionalInformation: string;
}
