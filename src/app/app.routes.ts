import { Routes } from '@angular/router';
import { ArticlePageComponent } from './features/articles/content/article-page.component';
import { HomeComponent } from './features/articles/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'article/:id',
    component: ArticlePageComponent
  }
];
