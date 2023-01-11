import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MadmooneSpinnerComponent } from './madmoone-spinner/madmoone-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmptyStateV2Component } from './empty-state-v2/empty-state-v2.component';
import { ImagePreloadDirective } from './image-preload.directive';
import { LazyImgDirective } from './lazy-loading.directive';
import { FilterPipe, SafeHtmlPipe } from './all.pipe';
import { ShareNetworkComponent } from './share-network/share-network.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { RealstatesFilterComponent } from './realstates-filter/realstates-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EquipementModalComponent } from './equipement-modal/equipement-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MadmooneSpinnerComponent,
    EmptyStateV2Component,
    ImagePreloadDirective,
    LazyImgDirective,
    SafeHtmlPipe,
    ShareNetworkComponent,
    RealstatesFilterComponent,
    EquipementModalComponent,
    FilterPipe,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MadmooneSpinnerComponent,
    NgxSpinnerModule,
    EmptyStateV2Component,
    ImagePreloadDirective,
    LazyImgDirective,
    SafeHtmlPipe,
    FilterPipe,
    ShareNetworkComponent,
    RealstatesFilterComponent,
    EquipementModalComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ShareButtonsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
})
export class SharedModule {}
