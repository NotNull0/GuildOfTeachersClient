import { Component, OnInit } from '@angular/core';
import {TeachingProgramContainer} from '../../../../../../shared/models/teaching-program-container';
import {TeachingProgramContainerService} from '../../../../../../shared/service/teaching-program-container.service';

@Component({
  selector: 'app-teaching-programs-wrapper',
  templateUrl: './teaching-programs-wrapper.component.html',
  styleUrls: ['./teaching-programs-wrapper.component.css'],
  providers: [TeachingProgramContainerService]
})
export class TeachingProgramsWrapperComponent implements OnInit {

  teachingProgramsContainers: TeachingProgramContainer [] = [];
  constructor(private  _teachingProgramsContainerService: TeachingProgramContainerService) {
    this._teachingProgramsContainerService.findAllAvailable().subscribe(next => {
        this.teachingProgramsContainers = next;
      }, error => {
        console.log(error);
      }
    )
  }

  delete(cont: TeachingProgramContainer){
    cont.available=false;
    this._teachingProgramsContainerService.delete(cont.id).subscribe(next=>{
      this.teachingProgramsContainers.splice(this.teachingProgramsContainers.indexOf(cont),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {
  }

}
