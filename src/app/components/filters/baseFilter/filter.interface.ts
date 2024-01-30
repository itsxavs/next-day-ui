import { Classroom } from "src/app/models";
import { Student } from "../../../models/user.interface";

export interface Filter<T> {
  value: T;
  selected: boolean;
}

export interface selectedFilter {
  date: boolean;
  status: string[];
  classrooms: Classroom[];
  subject: string[];
  search: string;
  students: Student[];
}
