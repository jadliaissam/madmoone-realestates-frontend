import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
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
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
