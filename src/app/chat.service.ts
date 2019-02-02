import { Injectable, OnInit } from "@angular/core";
import * as io from "socket.io-client";
import { Subject } from "../../node_modules/rxjs";
// keep here because could make more than 1 service
@Injectable({
  providedIn: "root"
})
export class ChatService implements OnInit {
  // creating a subscription for the messages
  private socket = io("http://localhost:3000");
  private userId: string;

  // could create another user model   passed back from data base that contain namme last name etc...
  getUserId() {
    return this.userId;
  }
  ngOnInit() {}
  sendMessage(newMessage: string) {
    this.socket.emit("chat message", newMessage);
  }
  receiveMessage() {
    const messagesUpdated = new Subject<any>();
    this.socket.on("chat message", function(msg) {
      console.log(messagesUpdated);
      messagesUpdated.next(msg);
      console.log(msg);
    });
    return messagesUpdated.asObservable();
  }
}
