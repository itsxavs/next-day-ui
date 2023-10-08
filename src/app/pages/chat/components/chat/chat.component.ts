import { MessageChat } from "../../../../core/models/message.interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @Input() messages: MessageChat[];
  constructor() {}

  ngOnInit(): void {}
}
