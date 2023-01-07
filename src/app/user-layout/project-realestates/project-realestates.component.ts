import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IProjectUnit, IRealEstate } from 'src/app/entities/all.entity';
import { ProjectService } from 'src/app/services/project.service';
import { getApiBaseUrl } from 'src/app/shared/shared.functions';

@Component({
  selector: 'app-project-realestates',
  templateUrl: './project-realestates.component.html',
  styleUrls: ['./project-realestates.component.scss'],
})
export class ProjectRealstatesComponent implements OnInit {
  showFilter = false;

  realStates: Array<IRealEstate> = [];
  allRealStates: Array<IRealEstate> = [];
  projectUnits: Array<IProjectUnit> = [];
  selectedProjectUnitId: string | null = null;


  public loading = false;
  public loadingUnits = false;
  apiLink = getApiBaseUrl();

  // filter

title = 'Liste des Biens';
 desc = 'Liste des Biens dans ce projet';

  filterForm: FormGroup = new FormGroup({});

  showPropertiesPublic = true;
  propertiesTypes = ['type 1', 'type 2', 'type 3', 'type 4'];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

ngOnInit(): void {
    this.createForm();
    this.route.queryParams.pipe(first())
      .subscribe(params => {
        console.log(params);
        if(params['unitId']){
          this.selectedProjectUnitId = params['unitId'];
          this.showFilter = true;
          this.filterForm.get('unites')?.setValue([this.selectedProjectUnitId]);
        }
      }
    );
    this.getProjectRealEstates();
  }

  getProjectRealEstates(){
    this.loading = true;
    this.projectService.getAllRealEstatesByProject().then(
      (data: Array<IRealEstate>) => {
        this.loading = false;
        this.realStates = data;
        this.allRealStates = [...data];
        console.log('realestates', this.realStates);
        // filter realestate base on project unit id
        if(this.selectedProjectUnitId){
          this.realStates = this.allRealStates.filter((realestate: IRealEstate) => {
            return realestate.projectUnit === this.selectedProjectUnitId;
          });
        }
        this.getProjectUnits();
        // this.propertiesReserved = this.realStates;
      },
    ), (error : any) => {
      this.loading = false;
      console.log(error);
    }
  }

  getProjectUnits(){
    this.loadingUnits = true;
    this.projectService.getAllProjectUnitByPorjectID().then(
      (data: Array<IProjectUnit>) => {
        this.loadingUnits = false;
        this.projectUnits = data;
        console.log('units', this.projectUnits);
        // this.propertiesReserved = this.realStates;
      },
    ), (error : any) => {
      this.loadingUnits = false;
      console.log(error);
    }
  }

  createForm() {
    this.filterForm = new FormGroup({
      unites: new FormControl([]),
    });
  }

  resetForm() {
    this.filterForm.reset();
    this.filter();
  }

  filter(){
    // filter realstates using units
    const units = this.filterForm.get('unites')?.value;
    if(units.length === 0){
      this.realStates = [...this.allRealStates];
      return;
    }
    this.realStates = this.allRealStates.filter((realestate: IRealEstate) => {
      return units.includes(realestate.projectUnit);
    });
  }
}
