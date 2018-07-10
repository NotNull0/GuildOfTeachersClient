import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../../../../shared/service/article.service';
import {Article} from '../../../../../../shared/models/article';

@Component({
  selector: 'app-artickle-container',
  templateUrl: './artickle-container.component.html',
  styleUrls: ['./artickle-container.component.css'],
  providers: [ArticleService]
})
export class ArticleContainerComponent implements OnInit {

  popularArticles: Article[] = [];


  currentPage: number = 1;

  bool = true;

  backBool: boolean;

  articles: Article[] = [];
  show=false;
  constructor(private _articleService: ArticleService) {
    this._articleService.findPopular().subscribe(next => {
      this.popularArticles = next;
    },error => {
        console.log(error);
    });
    this._articleService.findAllAvailablePageable(0, 6).subscribe(next => {
      if (next.length < 6) {
        this.bool = false;
      } else
        this.bool = true;
      if (next.length != 0)
        this.articles = next;
    }, error => {
      console.log(error);
    });
    this.backBool = this.currentPage == 1;
  }

  loadPage(zsuv: number) {
    if (this.currentPage + zsuv >= 1) {
      this._articleService.findAllAvailablePageable(this.currentPage - 1 + zsuv, 6).subscribe(next => {
        this.bool = next.length >= 6;
        if (next.length != 0 || this.currentPage + zsuv == 1) {
          this.articles = next;
          this.currentPage += zsuv;
          this.backBool = this.currentPage == 1;
        }
      });
    }
  }

  delete(art: Article) {
    art.available = false;
    this._articleService.update(JSON.stringify(art)).subscribe(next => {
      this.loadPage(this.articles.length == 1 ? this.currentPage == 1 ? 0 : -1 : 0);
      this._articleService.findPopular().subscribe(next => {
        this.popularArticles = next;
      },error => {
        console.log(error);
      });
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

  ngOnInit() {

  }

}
