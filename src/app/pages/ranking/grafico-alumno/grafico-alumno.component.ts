import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { ResultadoGeneral } from "src/app/models/ranking.model";
@Component({
  selector: "app-grafico-alumno",
  templateUrl: "./grafico-alumno.component.html",
  styleUrls: ["./grafico-alumno.component.scss"],
})
export class GraficoAlumnoComponent implements OnChanges, OnInit {
  @Input() resultadoGeneral: ResultadoGeneral;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = []; // Aquí irán los nombres de los posts
  barChartData: ChartDataSets[] = [
    { data: [], label: "Puntuación", backgroundColor: "#008000" }, // Aquí irán las puntuaciones de los posts
  ];
  tableData: ResultadoGeneral[] = [];
  constructor() {}

  ngOnInit(): void {
    // this.tableData = this.resultadoGeneral.resultado.calificacion.resultado.post;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resultadoGeneral.currentValue) {
      this.barChartLabels = [
        "Presentación",
        "Organización",
        "Exactitud",
        "General",
      ];
      this.barChartData[0].data = [
        this.resultadoGeneral.resultado.puntosPorAspecto.presentacion,
        this.resultadoGeneral.resultado.puntosPorAspecto.organizacion,
        this.resultadoGeneral.resultado.puntosPorAspecto.exactitud,
        this.resultadoGeneral.resultado.puntosPorAspecto.general,
      ];
    }
  }
}
