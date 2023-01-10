import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { IProject } from '../entities/all.entity';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectApiUrl = 'project/';
  realEstatesApiUrl = 'realesates/';
  projectUnitApiUrl = 'units/';
  currentProject: IProject | null = null;

  constructor(private apiService: ApiService) { }

  getUserMainProject() {
    return this.apiService.get(`${this.projectApiUrl}`).pipe(
      first(),
      map((projects: Array<IProject>) => {
        this.currentProject = projects[0] || null;
        return projects[0] || null;
      })
    );
  }


  // realestates methods
  async getAllRealEstatesByProject() {
    if(!this.currentProject) {
      await this.getUserMainProject().toPromise();
    };
    return this.apiService.get(`${this.projectApiUrl}${this.currentProject!._id}/${this.realEstatesApiUrl}`).pipe(first()).toPromise();
  }


  getAllProjectUnitByPorjectID() {
    return this.apiService.get(`${this.projectApiUrl}${this.currentProject!._id}/${this.projectUnitApiUrl}`).pipe(first()).toPromise();
  }

  getAllRealEstatesByProjectIdAndUnitsArray(){
    return this.apiService.post(`${this.projectApiUrl}${this.currentProject!._id}/${this.realEstatesApiUrl}`).pipe(first()).toPromise();
  }

  async getProjectUnitByPorjectIDAndUnitID(unitID: string) {
    if(!this.currentProject) {
      await this.getUserMainProject().toPromise();
    };
    return this.apiService.get(`project-unit/${unitID}`).pipe(first()).toPromise();
  }
}
