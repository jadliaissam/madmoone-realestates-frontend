import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectRealstatesComponent } from './project-realestates/project-realestates.component';
import { UnitDetailsComponent } from './unit-details/unit-details.component';
import { UserLayoutComponent } from './user-layout.component';

const routes: Routes = [
    {
        path: '',
        component : UserLayoutComponent,
        children : [
            {
                path: '',
                component : ProjectDetailComponent
            },
            {
                path: 'realestates',
                component : ProjectRealstatesComponent
            },
            {
                path: 'units/:id',
                component : UnitDetailsComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
