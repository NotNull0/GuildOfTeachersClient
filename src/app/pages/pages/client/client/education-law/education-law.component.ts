import {Component, OnInit} from '@angular/core';
import {LawContainerService} from '../../../../../shared/service/law-container.service';
import {LawContainer} from '../../../../../shared/models/law-container';
import {CommentService} from '../../../../../shared/service/comment.service';
import {Comment} from '../../../../../shared/models/comment';
import {isNullOrUndefined} from 'util';
import {LawService} from '../../../../../shared/service/law.service';
import {Law} from '../../../../../shared/models/law';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {User} from '../../../../../shared/models/user';

@Component({
  selector: 'app-education-law',
  templateUrl: './education-law.component.html',
  styleUrls: ['./education-law.component.css'],
  providers: [LawContainerService,LawService]
})
export class EducationLawComponent implements OnInit {

  lawContainers: LawContainer[] = [];
  comemnts: Comment[] = [];
  user: User = new User();

  constructor(private _lawContainerService: LawContainerService, private _law: LawService, private _user: UserDetailsService) {
    this._lawContainerService.findAllAvailable().subscribe(next => {
      if(isNullOrUndefined(next)){
        this.lawContainers = [];
      }else
      this.lawContainers = next;
    }, error => {
      console.log(error);
    });
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
      this.user=next;
    })
  }

  deleteContainer(one: LawContainer){
    one.available=false;
    this._lawContainerService.update(one).subscribe(next=>{
        this.lawContainers.splice(this.lawContainers.indexOf(one),1);
    },error => {
        console.log(error);
    })
  }

  deleteLaw(one: LawContainer, two :Law){
    this._law.delete(two.id).subscribe(next=>{
     one.laws.splice(one.laws.indexOf(two),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {
  }

}
