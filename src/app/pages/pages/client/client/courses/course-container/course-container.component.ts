import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CourseService} from '../../../../../../shared/service/course.service';
import {Course} from '../../../../../../shared/models/course';
import {CourseCategory} from '../../../../../../shared/models/course-category';
import {CourseCategoryService} from '../../../../../../shared/service/course-category.service';
import {QuestionnaireService} from '../../../../../../shared/service/questionnaire.service';
import {Questionnaire} from '../../../../../../shared/models/questionnaire';

import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.css'],
  providers: [CourseCategoryService, QuestionnaireService]
})
export class CourseContainerComponent implements OnInit {

  courseTypes: string[] = [
    'Курс',
    'Семінар',
    'Вебінар',
    'Тренінг',
    'Майтер клас',
    'Інший'
  ];

  courses: Course [] = [];
  allCourses: Course[] = [];
  answer: number;
  questForm: FormGroup;
  categoryShow: boolean = false;
  currentPage: number = 1;
  questionnaire: Questionnaire = new Questionnaire();
  // courseCategories = [
  //   {
  //     id:1,
  //     name: 'ajsdsa',
  //     count: 25.6
  //   },
  //   {
  //     id:2,
  //     name: 'ajsdsa',
  //     count: 25.6
  //   },
  //   {
  //     id:3,
  //     name: 'ajsdsa',
  //     count: 25.6
  //   },
  // ];
  categories: CourseCategory[] = [];
  bool = true;
  backBool: boolean;
  canVote: boolean = true;
  _canVote = new Subject<boolean>();
  canVote$ = this._canVote.asObservable();
  topThree: Course[]=[];


  @ViewChild('arrowImg') arrow: ElementRef;

  @ViewChild('categoryInput') inputCourseCategory: ElementRef;
  @ViewChild('filterCategoryHeader') typeFilter: ElementRef;





  constructor(private _coursesService: CourseService, private _courseCategory: CourseCategoryService, private _questionnaireService: QuestionnaireService) {

    this._questionnaireService.findAllAvailable().subscribe(next => {
      if (next.length == 1) {
        this.canVote=next[0].canVote;

        this.questionnaire = next[0];
      }
    });
    this._courseCategory.findAllAvailable().subscribe(next => {
      this.categories=next;
    },error => {
      console.log(error);
    });
    this._coursesService.findTopThree().subscribe(next=>{
      console.log(next);
        this.topThree=next;
    },error => {
        console.log(error);
    })
    _coursesService.findAllPageableAvailable(0, 6).subscribe(next => {
      if (next.length < 6) {
        this.bool = false;
      } else {
        this.bool = true;
      }
      if (next.length != 0)
        this.courses = next;
    }, error => {
      console.log(error);
    });
    this.backBool = this.currentPage == 1;
  }

  loadPage(zsuv: number) {
    if (this.currentPage + zsuv >= 1) {
      this._coursesService.findPageableFilter(this.inputCourseCategory.nativeElement.value, this.courseTypes.indexOf(this.typeFilter.nativeElement.innerHTML), this.currentPage - 1 + zsuv, 6).subscribe(next => {
        this.bool = next.length >= 6;
        if (next.length != 0 || this.currentPage + zsuv == 1) {
          this.courses = next;
          this.currentPage += zsuv;
          this.backBool = this.currentPage == 1;
        }
      });
    }
  }

  delete(course: Course){
    console.log("fasfasasf");
    course.available=false;
    this._coursesService.update(JSON.stringify(course)).subscribe(next=>{
      this.loadPage(this.courses.length == 1 ? this.currentPage == 1 ? 0 : -1 : 0);
      this._coursesService.findTopThree().subscribe(next => {
        this.topThree = next;
      },error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  vote() {
    this._questionnaireService.vote(this.questionnaire.id, this.answer).subscribe(next => {
      console.log(next);
      this.questionnaire = next;
      this.canVote = next.canVote;
      this._canVote.next(this.canVote);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {

    this.questForm = new FormGroup({
      answer: new FormControl(''),
    });
    this.questForm.valueChanges.subscribe(next => {
      this.answer = next.answer;
    });
  }

  hide(subjects: HTMLDivElement) {
    subjects.style.display = 'none';
    this.arrow.nativeElement.style.transform = 'rotate(0deg)';
    this.categoryShow = false;
  }


  show(category: HTMLDivElement) {
    if (this.categoryShow == false) {
      category.style.display = 'block';
      this.arrow.nativeElement.style.transform = 'rotate(180deg)';
      this.categoryShow = true;
    } else {
      category.style.display = 'none';
      this.arrow.nativeElement.style.transform = 'rotate(0deg)';
      this.categoryShow = false;
    }
  }

  clickFilter(category: string, type: HTMLDivElement, courseType: string) {
    type.innerHTML = courseType;
    this._coursesService.findPageableFilter(category, this.courseTypes.indexOf(courseType), 0, 6).subscribe(next => {
      if (next.length == 0 && this.currentPage == 1 || next.length == 0 || next.length < 6 || next.length < 6 && this.currentPage == 1) {
        this.bool = false;
      } else
        this.bool = true;
      this.courses = next;
      this.backBool = this.currentPage == 1;
    }, error => {
      console.log(error);
    });

  }

  filter(category: string, type: HTMLDivElement) {
    this._coursesService.findPageableFilter(category, this.courseTypes.indexOf(type.innerHTML), 0, 6).subscribe(next => {
      this.courses = next;
      if (next.length == 0 && this.currentPage == 1 || next.length == 0 || next.length < 6 || next.length < 6 && this.currentPage == 1) {
        this.bool = false;
      } else
        this.bool = true;
      this.courses = next;
      this.backBool = this.currentPage == 1;
    }, error => {
      console.log(error);
    });
  }

  prePage() {
    this.loadPage(-1);
  }

  nextPage() {
    this.loadPage(1);
  }
}

