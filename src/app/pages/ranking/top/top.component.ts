import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-top",
  templateUrl: "./top.component.html",
  styleUrls: ["./top.component.scss"],
})
export class TopComponent implements OnChanges {
  @Input() top: String[];

  top1: String = "";
  top2: String = "";
  top3: String = "";

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.top.currentValue && changes.top.currentValue.length > 0) {
      this.top1 = this.top[0];
      this.top2 = this.top[1];
      this.top3 = this.top[2];
    }
  }
}
