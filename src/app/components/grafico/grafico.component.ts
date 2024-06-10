import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.component.html",
  styleUrls: ["./grafico.component.scss"],
})
export class GraficoComponent implements OnInit {
  @Output() ratingEvent = new EventEmitter<number>();
  stars: string[] = ["empty", "empty", "empty", "empty", "empty"];
  rating: number = 0;

  constructor() {}

  ngOnInit(): void {}

  setRating(index: number): void {
    this.rating = index + 1;
    this.stars = this.stars.map((_, i) => (i < this.rating ? "full" : "empty"));
    this.ratingEvent.emit(this.rating);
  }

  previewRating(index: number): void {
    this.stars = this.stars.map((_, i) => (i <= index ? "full" : "empty"));
  }

  resetStars(): void {
    this.stars = this.stars.map((_, i) => (i < this.rating ? "full" : "empty"));
  }
}
