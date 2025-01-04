import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string;
  private osDefault: string;

  constructor() {
    this.osDefault = this.getOsDefault();

    const theme = localStorage.getItem('theme');
    this.currentTheme = theme
      ? theme
      : this.osDefault

    if (!theme)
      this.setTheme('os-default');
  }

  getTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
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
      :'light'
  }
}
