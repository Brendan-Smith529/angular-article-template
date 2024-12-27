import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeComponent
  ],
  exports: [ThemeComponent],
})
export class SharedModule {}
