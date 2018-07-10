import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatRoom} from '../../../../../shared/models/chat-room';
import {StompService} from '../../../../../shared/service/stomp.service';
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: []
})
export class ChatComponent implements OnInit {
  chatRooms: ChatRoom[] = [];
  @ViewChild('containers') chats: ElementRef;
  bool=false;

  constructor(private _stomservice: StompService,private _route: ActivatedRoute) {
    this.chatRooms = _stomservice.chatRooms;
    this._stomservice.chatRooms$.subscribe(next => {
      this.chatRooms = next;
      this.bool=true;
    },error => {
        console.log(error);
    });
    this.bool=this.chatRooms.length>0;
  }

  getInChat(containers: HTMLDivElement, arrow: HTMLImageElement) {
    if (document.body.clientWidth < 767.98) {
      containers.style.left = '-110%';
      arrow.style.display = 'block';
    }
  }

  showContainers(containers: HTMLDivElement, arrow: HTMLImageElement) {
    containers.style.left = '0';
    arrow.style.display = 'none';
  }



  ngOnInit() {
    this._route.url.subscribe(next=>{
      if(next.toString()=='chat'){
        this.chats.nativeElement.style.left = '0';
      }
    });
  }

}
