import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

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
  private type: string;
  showThemeOpts: boolean = false;

  themes = [
    { value: 'os-default', label: 'OS Default' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  constructor() {
    const themeType = localStorage.getItem('theme')
      ? localStorage.getItem('theme') as string
      : ''

    this.type = themeType !== '' ? themeType : 'os-default';

    if (themeType !== this.type)
      localStorage.setItem('theme', this.type);
  }

  toggleDisplay(): void {
    this.showThemeOpts = !this.showThemeOpts;
  }

  getTheme(): string {
    return 'icon-' + this.type;
  }

  setTheme(type: string): void {
    localStorage.setItem('theme', type);
    this.type = type;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    if (!this.showThemeOpts || !this.menuContainer)
      return;

    if (!this.menuContainer.nativeElement.contains(event.target))
      this.showThemeOpts = false;
  }
}
