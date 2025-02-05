import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ThemeService } from '../../../../shared/theme/theme.service';
import { ApiService } from '../../../../shared/api/api.service';
import { Article, ArticleContent } from '../../../../shared/api/api';

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
export class ArticlePageComponent implements AfterViewInit, OnDestroy {
  title = 'personal-site';
  private _articles: Article[] = [];
  currentArticle: number = 0;
  content: ArticleContent = { Headers: [], Paragraphs: [] };

  // Theme changing
  constructor(
    private ngZone: NgZone,
    private themeService: ThemeService,
    private apiService: ApiService,
  ) {}

  @HostBinding('class.dark') get mode() {
    return this.themeService.getTheme() === 'dark';
  }

  // Section manipulation
  currentSection: string = ''
  @ViewChildren('section') sections!: QueryList<ElementRef>
  private observer!: IntersectionObserver

  scrollToSection(e: MouseEvent, id: string): void {
    const section = document.getElementById(id);
    e.preventDefault();

    if (section)
      section.scrollIntoView({ behavior: 'smooth' });
  }

  get articles() {
    return this._articles;
  }

  set articles(items: Article[]) {
    this._articles = items.sort(item => item.ArticleNumber);

    this.content = this._articles[this.currentArticle].Content;
  }

  ngOnInit(): void {
    this.apiService.getContent().subscribe(
      data => this.articles = data.Items
    );
  }

  ngAfterViewInit(): void {
    const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.4,
		};

		this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);

        if (!intersectingEntry)
          return;

        this.currentSection = intersectingEntry
          .target
          .getAttribute("aria-labelledby") as string
      })
		}, observerOptions);

    this.sections.changes.subscribe(() => {
      for (const section of this.sections)
        this.observer.observe(section.nativeElement);
    })
  }

  ngOnDestroy(): void {
    for (const section of this.sections)
      this.observer.unobserve(section.nativeElement);
  }
}
