import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  imports: [
    CommonModule
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent {
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  showThemeOpts: boolean = false;

  themes = [
    { value: 'os-default', label: 'OS Default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  constructor(private themeService: ThemeService) {}

  toggleDisplay(): void {
    this.showThemeOpts = !this.showThemeOpts;
  }

  getTheme(): string {
    return this.themeService.getTheme();
  }

  getThemeType(): string {
    return this.themeService.getThemeType();
  }

  setTheme(type: string): void {
    this.themeService.setTheme(type);
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (!this.showThemeOpts || !this.menuContainer)
      return;

    if (!this.menuContainer.nativeElement.contains(event.target))
      this.showThemeOpts = false;
  }
}
