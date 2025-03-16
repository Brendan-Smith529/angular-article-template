import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = '';
  private themeType: string = '';
  private osDefault: string;

  constructor() {
    this.osDefault = this.getOsDefault();

    const theme = localStorage.getItem('theme');
    this.setTheme(theme ? theme : 'os-default');
  }

  getTheme(): string {
    return this.currentTheme;
  }

  getThemeType(): string {
    return this.themeType;
  }

  setTheme(theme: string): void {
    this.themeType = theme;
    this.currentTheme = theme === 'os-default' ? this.osDefault : theme;
    localStorage.setItem('theme', theme);
  }

  getOsDefault(): string {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.osDefault = e.matches ? 'dark' : 'light';

      if (localStorage.getItem('theme') === 'os-default')
        this.setTheme('os-default');
    });

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
}
