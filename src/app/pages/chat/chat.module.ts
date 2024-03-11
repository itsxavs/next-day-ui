import { ComponentsModule } from "./../../components/components.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatRoomComponent } from "./chatroom.component";
import { UserChatComponent } from "./components/user-chat/user-chat.component";
import { ChatComponent } from "./components/chat/chat.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MessageCountPipe } from "./pipe/messageCountPipe.pipe";

@NgModule({
  declarations: [
    ChatRoomComponent,
    UserChatComponent,
    ChatComponent,
    MessageCountPipe,
  ],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatRoomModule {}
