import {
  Component,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { ThemeService } from './shared/theme/theme.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-site';

  // Theme changing
  constructor(
    private themeService: ThemeService,
  ) {}

  @HostBinding('class.dark') get mode() {
    return this.themeService.getTheme() === 'dark';
  }
}
