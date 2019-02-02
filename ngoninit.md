chat service and chat component


1) chat service - make the receiving as a subprogram
receiveMessage() {
    const messagesUpdated = new Subject<any>();
    this.socket.on("chat message", function(msg) {
      console.log(messagesUpdated);
      messagesUpdated.next(msg);
      console.log(msg);
    });
    return messagesUpdated.asObservable();
  }
2) chat comonent- put the subscription in ngoninit because it only needs to be initilized once to make the subscription active and ready to get data, otherwise will create some weird bugs.

this.messagesSub=this.chatService.receiveMessage().subscribe(newMessage=>{
      this.currentMessages.push(newMessage);
