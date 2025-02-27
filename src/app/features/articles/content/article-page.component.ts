import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ArticleContent } from '../../../shared/api/api';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'article-page',
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent implements AfterViewInit, OnDestroy {
  articleInfo: { Title: string, Num: number }[] = [];
  articleNum: number = 0;
  content: ArticleContent = { Headers: [], Paragraphs: [] };

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
  ) {}

  // Section manipulation
  currentHeader: string = ''
  @ViewChildren('header') headers!: QueryList<ElementRef<HTMLHeadingElement>>;
  reversedHeaders: ElementRef<HTMLHeadingElement>[] = [];
  private observer!: IntersectionObserver;

  scrollToSection(id: string): void {
    const section = document.getElementById(id);
    if (!section) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      return;
    }

    section.scrollIntoView({ behavior: 'smooth' });
  }

  getArticleInfo(): void {
    // Get and set all article names
    const [numArticles, firstArticle] = localStorage.getItem('articles-info')!.split(" ").map(Number);
    this.articleInfo = Array.from({ length: numArticles }, (_, index) => {
      const article = JSON.parse(localStorage.getItem(`article-${index + firstArticle}`)!);
      return { Title: article.Headers[0], Num: index + firstArticle }
    });

    // Get and set article content
    this.route.paramMap.subscribe(params => {
      this.articleNum = Number(params.get('id'));
      const stringContent = localStorage.getItem(`article-${this.articleNum}`);
      this.content = JSON.parse(stringContent!);
    });
  }

  ngOnInit(): void {
    this.getArticleInfo();

    // Handle url changes and popstates
    this.route.fragment.subscribe((frag) => this.scrollToSection(frag!));

    history.scrollRestoration = 'manual';
    window.addEventListener('popstate', () =>
      this.scrollToSection(decodeURIComponent(window.location.hash.substring(1)))
    );
  }

  ngAfterViewInit(): void {
    this.reversedHeaders = this.headers.toArray().reverse();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const headerEl = this.reversedHeaders.find(el => {
      const rect = el.nativeElement.getBoundingClientRect();
      return rect.top <= 0;
    });

    const newHeader = headerEl
      ? headerEl.nativeElement.getAttribute('aria-labelledby')!
      : ''

    if (this.currentHeader === newHeader) return;

    this.currentHeader = newHeader;
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
