import { ComponentsModule } from "./components/components.module";
import { ChatRoomModule } from "./pages/chat/chat.module";
import { ChatRoomComponent } from "./pages/chat/chatroom.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { SettingsModule } from "./pages/settings/settings.module";
import { WorksComponent } from "./pages/works/works.component";
import { HomeComponent } from "./pages/home/home.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginModule } from "./pages/login/login.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeModule } from "./pages/home/home.module";
import { MatDialogModule } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { WorksModule } from "./pages/works/works.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    WorksModule,
    SettingsModule,
    MatDialogModule,
    ChatRoomModule,
    ComponentsModule,
    RouterModule.forRoot(
      [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login", component: LoginComponent },
        { path: "home", component: HomeComponent },
        { path: "works", component: WorksComponent },
        { path: "settings", component: SettingsComponent },
        { path: "chat", component: ChatRoomComponent },
      ],
      { relativeLinkResolution: "legacy" }
    ),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
