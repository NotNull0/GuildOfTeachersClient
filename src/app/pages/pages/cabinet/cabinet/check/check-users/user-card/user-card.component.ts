import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../../../../../shared/models/user';
import {UserService} from '../../../../../../../shared/service/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  providers:[UserService]
})
export class UserCardComponent implements OnInit {
  @Input("user") user: User;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _user :UserService) {

  }

  send(inp:HTMLInputElement){
    if(inp.checked){
      this.user.role='MODERATOR';
    }
    this._user.pereviryty(this.user).subscribe(next=>{
      console.log(this.user);
      this.update.emit();
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {
  }

}
