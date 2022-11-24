import { UserChat } from "./../../../../interface/user";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-chat",
  templateUrl: "./user-chat.component.html",
  styleUrls: ["./user-chat.component.scss"],
})
export class UserChatComponent implements OnInit {
  @Input() user: UserChat;
  @Input() noRead: boolean;

  constructor() {}

  ngOnInit(): void {}
}
