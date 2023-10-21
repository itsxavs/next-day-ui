import { Classroom } from "src/app/core/models";

export interface Filter<T> {
  value: T;
  selected: boolean;
}

export interface selectedFilter {
  date: {
    from: string;
    to: string;
  };
  status: string[];
  classrooms: Classroom[];
  subject: string[];
  search: string;
}
