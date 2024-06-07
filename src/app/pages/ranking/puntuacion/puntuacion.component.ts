import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "app-puntuacion",
  templateUrl: "./puntuacion.component.html",
  styleUrls: ["./puntuacion.component.scss"],
})
export class PuntuacionComponent implements OnChanges {
  @Input() rating: number;
  stars: ("full" | "half" | "empty")[] = [];

  ngOnChanges(): void {
    const fullStars = Math.floor(this.rating);
    const halfStars = this.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    this.stars = [
      ...Array(fullStars).fill("full"),
      ...Array(halfStars).fill("half"),
      ...Array(emptyStars).fill("empty"),
    ];
  }
}
