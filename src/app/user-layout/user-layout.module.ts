import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutingModule } from './user-layout.routing';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';



@NgModule({
  declarations: [
    UserLayoutComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LightboxModule,
    NgbModule,
    UserLayoutRoutingModule,
    SharedModule
  ]
})
export class UserLayoutModule { }
