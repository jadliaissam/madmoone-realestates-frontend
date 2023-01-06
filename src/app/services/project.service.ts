import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { IProject } from '../entities/all.entity';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectApiUrl = 'project/';

  constructor(private apiService: ApiService) { }

  getUserMainProject() {
    return this.apiService.get(`${this.projectApiUrl}`).pipe(
      first(),
      map((projects: Array<IProject>) => {
        console.log(projects);
        return projects[0] || null;
      })
    );
  }


}
