import { HttpParams } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message } from "../models/message.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private URL = environment.apiUrl + "chat";

  constructor(private http: HttpClient) {}

  getMessageByChat(sender: string, receiver: string) {
    let queryParams = new HttpParams()
      .append("sender", sender)
      .append("receiver", receiver);
    this.http.get(this.URL, { params: queryParams });
  }

  sendMessage(message: Message) {
    this.http.post(this.URL, {
      message,
    });
  }
}
