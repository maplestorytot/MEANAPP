import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChatService } from "../chat.service";
import { NgForm } from "../../../node_modules/@angular/forms";
import { Subscription } from "../../../node_modules/rxjs";
@Component({
  selector:"app-chat",
  templateUrl: "./chat.component.html",
  styleUrls:['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
  private messagesSub:Subscription;
  currentMessages=[];
  // injecting the authentification service
  constructor(private chatService: ChatService) {}
  // put the receive messages in here so that it doesn't create more than one instance of the messages
  ngOnInit(){
    this.messagesSub=this.chatService.receiveMessage().subscribe(newMessage=>{
      this.currentMessages.push(newMessage);
    })
  }

  onSocket(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.chatService.sendMessage(form.value.socket);

  }
  ngOnDestroy(){
    this.messagesSub.unsubscribe();
  }
}
