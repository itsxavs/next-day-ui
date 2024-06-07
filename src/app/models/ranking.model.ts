import { Post } from "./post.interface";
import { Student } from "./user.interface";

export interface Calificaciones {
  presentacion: number;
  organizacion: number;
  exactitud: number;
  general: number;
}

export interface Resultado {
  post: Post[];
  calificacion: Calificaciones;
  puntos: number;
}

export interface ResultadoGeneral {
  student: Student;
  resultado: Resultado;
}
