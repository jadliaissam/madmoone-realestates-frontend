import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MadmooneSpinnerComponent } from './madmoone-spinner/madmoone-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmptyStateV2Component } from './empty-state-v2/empty-state-v2.component';
import { ImagePreloadDirective } from './image-preload.directive';
import { LazyImgDirective } from './lazy-loading.directive';
import { SafeHtmlPipe } from './all.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MadmooneSpinnerComponent,
    EmptyStateV2Component,
    ImagePreloadDirective,
    LazyImgDirective,
    SafeHtmlPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MadmooneSpinnerComponent,
    NgxSpinnerModule,
    EmptyStateV2Component,
    ImagePreloadDirective,
    LazyImgDirective,
    SafeHtmlPipe
  ],
  imports: [CommonModule, NgxSpinnerModule],
})
export class SharedModule {}
