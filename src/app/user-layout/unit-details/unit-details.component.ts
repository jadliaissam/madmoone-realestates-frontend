import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { first } from 'rxjs';
import { IProject, IProjectUnit } from 'src/app/entities/all.entity';
import { ProjectService } from 'src/app/services/project.service';
import { getApiBaseUrl } from 'src/app/shared/shared.functions';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit {

  public loading = false;
  projectUnit : IProjectUnit | null = null;
  project : IProject | null = null;
  apiLink = getApiBaseUrl();
  horizontalViewMode = true;

  public _albums: Array<any> = [];

  constructor(
    private _lightbox: Lightbox,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    _lightboxConfig: LightboxConfig
  ) {
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.fitImageInViewPort = true;
  }

  ngOnInit(): void {
    this.route.params.pipe(first())
    .subscribe(params => {
      console.log(params);
      if(params['id']){
        this.projectUnit = {_id : params['id']};
        this.getProjectUnit();
      }
    })
  }

  getProjectUnit() {
    this.loading = true;
    this.projectService.getProjectUnitByPorjectIDAndUnitID(this.projectUnit!._id).then(
      (data: IProjectUnit) => {
        this.loading = false;
        this.projectUnit = data;
        this.project = this.projectService.currentProject;
        if (this.projectUnit?.photos) {
          this.projectUnit.photos.forEach((image) => {
            const src = this.apiLink + image;
            const thumb = this.apiLink + image;
            const album = {
              src,
              thumb,
            };
            this._albums.push(album);
            // reverse the array to display the latest added photo at the top
            this._albums.reverse();
          });
        }
        console.log('project unit', this.projectUnit);
      },
    ), (error : any) => {
      this.loading = false;
      console.log(error);
    }
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
