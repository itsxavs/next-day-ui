import { ComponentsModule } from "./../../components/components.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatRoomComponent } from "./chatroom.component";
import { UserChatComponent } from "./components/user-chat/user-chat.component";
import { ChatComponent } from "./components/chat/chat.component";

@NgModule({
  declarations: [ChatRoomComponent, UserChatComponent, ChatComponent],
  imports: [CommonModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatRoomModule {}
