import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { first, Subscription } from 'rxjs';
import { IProject, IProjectUnit } from 'src/app/entities/all.entity';
import { ProjectService } from 'src/app/services/project.service';
import { getApiBaseUrl } from 'src/app/shared/shared.functions';
import { registerLocaleData } from '@angular/common';
import localAr from '@angular/common/locales/ar';
import localFR from '@angular/common/locales/fr';
@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit, OnDestroy {

  public loading = false;
  projectUnit : IProjectUnit | any | null = null;
  project : IProject | any | null = null;
  apiLink = getApiBaseUrl();
  horizontalViewMode = true;

  public _albums: Array<any> = [];
  usingLang : string | null = null;
  sub : Subscription = new Subscription();

  muchPicturesToShow = 7;
  constructor(
    private _lightbox: Lightbox,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private translate: TranslateService,
    _lightboxConfig: LightboxConfig
  ) {
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.fitImageInViewPort = true;
    this.usingLang = this.translate.currentLang;
    this.sub =  translate.onLangChange.subscribe((event) => {
      this.usingLang = event.lang;
    })
    registerLocaleData(localAr, 'ar');
    registerLocaleData(localFR, 'fr');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    if(event.target.innerWidth < 768) {
      this.muchPicturesToShow = 3;
      this.horizontalViewMode = false;
    }else{
      this.muchPicturesToShow = 7;
    }
    
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
          this.projectUnit.photos.forEach((image : any) => {
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

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
