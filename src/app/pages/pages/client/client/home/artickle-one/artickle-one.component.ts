import {Component, OnInit} from '@angular/core';
import {Article} from '../../../../../../shared/models/article';
import {ArticleService} from '../../../../../../shared/service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../../../../../shared/service/comment.service';
import {Comment} from '../../../../../../shared/models/comment';
import {User} from '../../../../../../shared/models/user';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';

@Component({
  selector: 'app-artickle-one',
  templateUrl: './artickle-one.component.html',
  styleUrls: ['./artickle-one.component.css'],
  providers: [ArticleService, CommentService]
})
export class ArtickleOneComponent implements OnInit {

  article: Article = new Article();
  myLastComment = new Comment();
  isAuth: boolean =false ;
  user: User = new User();

  constructor(private _userDetailsService: UserDetailsService,private _articleService: ArticleService, private activateRoute: ActivatedRoute, private _commentService: CommentService,private _route: Router) {
    this.activateRoute.params.subscribe(next => {
      this._articleService.findOne(next['id']).subscribe(next => {
        this.article = next;
      }, error => {
        console.log(error);
      });
    });
    this.isAuth=_userDetailsService.isAuth;
    this.user=_userDetailsService.user;
    this._userDetailsService.checkAuthStorage().subscribe(next=>{
      this.isAuth=next;
    });
    this. _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    });
  }



  sendComment(text: HTMLTextAreaElement) {
    if (text.value.length != 0) {
      this.myLastComment.available = true;
      this.myLastComment.text = text.value;
      text.style.borderColor = '';
      this._commentService.saveArticle(this.myLastComment, this.article.id).subscribe(next => {
        text.value = '';
        this.article.comments.push(next);
      }, error => {
        console.error(error);
        alert('Не вдалось надіслати повідомлення, помилка:['+error.status+']');
      });

    } else {
      text.style.borderColor = 'red';
    }
  }
  delete(){
    this.article.available=false;
    this._articleService.update(JSON.stringify(this.article)).subscribe(next=>{
      this._route.navigateByUrl('/');
    },error => {
      console.log(error);
    })
  }
  deleteComment(comment: Comment){
    comment.available=false;
    this._commentService.delete(comment.id).subscribe(next=>{
        this.article.comments.splice(this.article.comments.indexOf(comment),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {

  }



}
