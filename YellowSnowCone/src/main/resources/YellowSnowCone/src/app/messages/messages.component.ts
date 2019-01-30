import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { StorageService } from '../storage.service';
import { Users } from '../users';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  userid: number = 1;

  message: Message;

  messages: Message[];

  specificMessage: string;

  specificMessages: string[] = [];

  users = [];

  constructor(private messageService: MessageService, private storage: StorageService) { }

  ngOnInit() {
    this.messageService.getMessagesById()
    .subscribe(data => this.messages = data,(err) => console.log(err),() => this.loadMessages());
  }


  loadMessages() {

    for (let i of this.messages){
      if(i.userid1 === this.userid){
        this.users.push(i.user2.firstname + ' ' + i.user2.lastname);
      } else {
        this.users.push(i.user1.firstname + ' ' + i.user1.lastname);
      }
    }

    this.users = this.users.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })


  }

  populateMessageThread(user: string) {

    this.storage.setUserId1(this.userid);
    for (let i of this.messages){
      if(i.userid1 === this.userid){
        if(user === (i.user2.firstname + ' ' + i.user2.lastname)){
          this.specificMessage = "Me: " + i.textcontents;
          this.specificMessages.push(this.specificMessage);
          this.storage.setUserId2(i.user2.userid);
          this.storage.setUser1(i.user1);
          this.storage.setUser2(i.user2);
        }
      } else {
        if(user === (i.user1.firstname + ' ' + i.user1.lastname)){
          this.specificMessage = i.user1.firstname + " " + i.user1.lastname + ": " + i.textcontents;
          this.specificMessages.push(this.specificMessage);
          this.storage.setUserId2(i.user1.userid);
          this.storage.setUser1(i.user2);
          this.storage.setUser2(i.user1);
        }
      }
    }

    this.storage.setScope(this.specificMessages);

  }
  


}