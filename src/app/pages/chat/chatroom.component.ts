import { MessageChat } from "./../../interface/message";
import { UserChat } from "./../../interface/user";
import { Component, OnInit } from "@angular/core";
import { messageChatMock, userChatMock } from "src/app/mocks/mix";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.scss"],
})
export class ChatRoomComponent implements OnInit {
  users: UserChat[] = userChatMock;
  messages: MessageChat[] = messageChatMock;

  constructor() {}

  ngOnInit(): void {}
}
