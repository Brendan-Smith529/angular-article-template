import { Component } from '@angular/core';
import { Article } from '../../../shared/api/api';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/api/api.service';
import { CommonModule } from '@angular/common';
import { items } from './static-articles/generic';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _articles: Article[] = [];
  articleDescriptors: {Number: number, Title: string, Summary: string}[] = [];

  constructor(
    private apiService: ApiService,
  ) {}

  get articles() {
    return this._articles;
  }

  set articles(items: Article[]) {
    this._articles = items.sort(item => item.ArticleNumber);

    this.articleDescriptors = this.articles.map(article => ({
      Number: article.ArticleNumber,
      Title: article.Content.Headers[0],
      Summary: article.Content.Paragraphs[0]
    }));

    for (const article of this.articles)
      localStorage.setItem(`article-${article.ArticleNumber}`, JSON.stringify(article.Content));

    localStorage.setItem('articles-info', `${this.articles.length} ${this.articles[0].ArticleNumber}`);
  }

  ngOnInit(): void {
    // Using API
    // this.apiService.getContent().subscribe(
    //   data => this.articles = data.Items
    // );

    // Using static pages
    this.articles = items.sort(item => item.ArticleNumber);
  }
}
