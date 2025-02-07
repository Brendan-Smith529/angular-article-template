import {
  Component,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { ThemeService } from './shared/theme/theme.service';
import { ApiService } from './shared/api/api.service';
import { Article, ArticleContent } from './shared/api/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-site';
  private _articles: Article[] = [];
  articleDescriptors: {Title: string, Summary: string}[] = [];

  // Theme changing
  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
  ) {}

  @HostBinding('class.dark') get mode() {
    return this.themeService.getTheme() === 'dark';
  }

  get articles() {
    return this._articles;
  }

  set articles(items: Article[]) {
    this._articles = items.sort(item => item.ArticleNumber);

    this.articleDescriptors = this.articles.map(article =>({
      Title: article.Content.Headers[0],
      Summary: article.Content.Paragraphs[0]
    }));
  }

  ngOnInit(): void {
    // this.apiService.getContent().subscribe(
    //   data => this.articles = data.Items
    // );

    const items = [
      {
        ArticleNumber: 0,
        Content: {
          Headers: [
            "First article"
          ],
          Paragraphs: [
            "This is a paragraph that will describe the first article. It will be viewed as brilliant and magnanimous. It will be passed down for generations to come, with all kin praising this piece of text. I will be seen as the next Shakespeare. gggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjj"
          ]
        }
      },
      {
        ArticleNumber: 1,
        Content: {
          Headers: [
            "Second article"
          ],
          Paragraphs: [
            "This is a paragraph that will describe the second article. It will be viewed as brilliant and magnanimous. It will be passed down for generations to come, with all kin praising this piece of text. I will be seen as the next Shakespeare."
          ]
        }
      },
      {
        ArticleNumber: 2,
        Content: {
          Headers: [
            "Third article"
          ],
          Paragraphs: [
            "This is a paragraph that will describe the third article. It will be viewed as brilliant and magnanimous. It will be passed down for generations to come, with all kin praising this piece of text. I will be seen as the next Shakespeare."
          ]
        }
      },
      {
        ArticleNumber: 3,
        Content: {
          Headers: [
            "Fourth article"
          ],
          Paragraphs: [
            "This is a paragraph that will describe the fourth article. It will be viewed as brilliant and magnanimous. It will be passed down for generations to come, with all kin praising this piece of text. I will be seen as the next Shakespeare."
          ]
        }
      },
      {
        ArticleNumber: 4,
        Content: {
          Headers: [
            "Fifth article"
          ],
          Paragraphs: [
            "This is a paragraph that will describe the fifth and final article. It will be viewed as brilliant and magnanimous. It will be passed down for generations to come, with all kin praising this piece of text. I will be seen as the next Shakespeare."
          ]
        }
      },
    ]

    this.articles = items.sort(item => item.ArticleNumber);
  }
}
