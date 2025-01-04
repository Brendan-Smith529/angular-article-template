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
import { SharedModule } from './shared/shared.module';
import { ThemeService } from './shared/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'personal-site';

  // Theme changing
  constructor(private ngZone: NgZone, private themeService: ThemeService) {}

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

  ngAfterViewInit(): void {
    const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.4,
		};

		this.observer = new IntersectionObserver((entries) => {
      this.ngZone.run(() => {
        const intersectingEntry = entries.find(entry => entry.isIntersecting);

        if (!intersectingEntry) return;

        this.currentSection = intersectingEntry
          .target
          .getAttribute("aria-labelledby") as string
      })
		}, observerOptions);

		for (const section of this.sections)
			this.observer.observe(section.nativeElement);
  }

  ngOnDestroy(): void {
    for (const section of this.sections)
      this.observer.unobserve(section.nativeElement);
  }
}
