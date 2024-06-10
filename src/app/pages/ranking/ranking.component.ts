import { AfterViewInit, Component, OnInit } from "@angular/core";
import { TokenStorageService } from "../../services/token-storage.service";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Student, Teacher } from "src/app/models";
import { Resultado, ResultadoGeneral } from "src/app/models/ranking.model";
import { RankingService } from "src/app/services/ranking.service";
import { Chart } from "chart.js";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.component.html",
  styleUrls: ["./ranking.component.scss"],
})
export class RankingComponent implements OnInit, AfterViewInit {
  role: Observable<string> = this.tokenStorageService.role$;
  chart: Chart;
  student: Student;
  teacher: Teacher;

  resultadoAlumno$: Observable<Resultado>;

  resultadosGeneral$: Observable<ResultadoGeneral[]>;
  selectedRowIndex: number = -1;

  students: BehaviorSubject<Student[]> = this.rankingService.students;
  top3$: BehaviorSubject<String[]> = new BehaviorSubject<String[]>(null);
  selectStudent$: BehaviorSubject<ResultadoGeneral> =
    new BehaviorSubject<ResultadoGeneral>(null);

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private rankingService: RankingService
  ) {
    this.rankingService.getStudents();
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser().role === "STUDENT") {
      this.student = this.authService._studentUser.value;
      this.resultadoAlumno$ = this.rankingService.getCalificacionesAlumno(
        this.student._id
      );
      this.resultadosGeneral$ = this.rankingService.getStudents().pipe(
        map((students) => students.map((s) => s._id)),
        switchMap((studentsIds) =>
          this.rankingService.getCalificacionesAlumnos(studentsIds)
        )
      );

      this.resultadosGeneral$.subscribe((res) => {
        let resultado = res.find((resultado: ResultadoGeneral, index) => {
          if (resultado.student._id === this.student._id) {
            this.selectedRowIndex = index;
            return true;
          }
        });
        this.selectStudent$.next(resultado);
      });
    }
    if (this.tokenStorageService.getUser().role === "TEACHER") {
      this.teacher = this.authService._teacherUser.value;
      const studentIds = this.teacher.students.map((student) => student._id);
      this.resultadosGeneral$ =
        this.rankingService.getCalificacionesAlumnos(studentIds);
    }
    this.resultadosGeneral$.subscribe((res) => {
      let m = res.slice(0, 3).map((resultado: ResultadoGeneral) => {
        return `${resultado.student.name} ${resultado.student.firstname} ${resultado.student.lastname}`;
      });
      this.top3$.next(m);
    });
  }
  ngAfterViewInit(): void {
    // this.chart = new Chart("myChart", {
    //   type: "bar",
    //   data: {
    //     labels: ["Presentación", "Organización", "Exactitud", "General"],
    //     datasets: [
    //       {
    //         label: "Calificaciones",
    //         data: [0, 0, 0, 0],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //         ],
    //         borderColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
  }

  onRowSelected(event: any, i: number, resultado: ResultadoGeneral) {
    // Elimina la clase 'selected-row' de todas las filas
    this.selectedRowIndex = i;
    this.selectStudent$.next(resultado);

    // this.chart.data.datasets[0].data = [
    //   resultado.resultado.calificacion.presentacion,
    //   resultado.resultado.calificacion.organizacion,
    //   resultado.resultado.calificacion.exactitud,
    //   resultado.resultado.calificacion.general,
    // ];
    // this.chart.update();
  }
}
