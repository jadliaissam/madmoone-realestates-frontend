import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserLayoutRoutingModule } from './user-layout.routing';
import { ProjectDetailComponent } from './project-detail/project-detail.component';



@NgModule({
  declarations: [
    UserLayoutComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserLayoutRoutingModule,
    SharedModule
  ]
})
export class UserLayoutModule { }
