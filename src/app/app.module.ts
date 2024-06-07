import { ManageComponent } from "./pages/manage/manage.component";
import { ComponentsModule } from "./components/components.module";
import { ChatRoomModule } from "./pages/chat/chat.module";
import { ChatRoomComponent } from "./pages/chat/chatroom.component";
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
import { ProfileModule } from "./pages/profile/profile.module";
import { MatIconModule } from "@angular/material/icon";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ManageModule } from "./pages/manage/manage.module";
import { RankingComponent } from "./pages/ranking/ranking.component";
import { PuntuacionComponent } from "./pages/ranking/puntuacion/puntuacion.component";
import { GraficoComponent } from "./pages/ranking/grafico/grafico.component";

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PuntuacionComponent,
    GraficoComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HomeModule,
    ManageModule,
    ProfileModule,
    MatDialogModule,
    ChatRoomModule,
    ComponentsModule,
    MatIconModule,
    RouterModule.forRoot(
      [
        { path: "", redirectTo: "login", pathMatch: "full" },
        { path: "login", component: LoginComponent },
        { path: "home", component: HomeComponent },
        { path: "profile", component: ProfileComponent },
        { path: "chat", component: ChatRoomComponent },
        { path: "manage", component: ManageComponent },
        { path: "ranking", component: RankingComponent },
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
