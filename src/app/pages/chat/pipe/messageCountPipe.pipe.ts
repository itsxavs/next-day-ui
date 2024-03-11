import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "messageCount",
})
export class MessageCountPipe implements PipeTransform {
  transform(mensajes: any[], teacher: any, student: any, role: string): number {
    if (mensajes.length === 0) return 0;
    if (role === "TEACHER") {
    } else {
      return mensajes.filter(
        (mensaje) =>
          !(mensaje.teacher === teacher) && mensaje.student === student
      ).length;
    }
  }
}
