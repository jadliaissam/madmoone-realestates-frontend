import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

import * as L from 'leaflet';

import {
  loadMap,
  icon,
  LAYER,
  getApiBaseUrl,
} from 'src/app/shared/shared.functions';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/entities/all.entity';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  public loading = false;
  map: any;
  project: IProject | null = null;
  apiLink = getApiBaseUrl();

  public _albums: Array<any> = [];
  constructor(
    private _lightbox: Lightbox,
    private projectService: ProjectService,
    _lightboxConfig: LightboxConfig
  ) {
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.fitImageInViewPort = true;
  }

  ngOnInit(): void {
    this.getMainProject();
  }

  getMainProject() {
    this.loading = true;
    this.projectService.getUserMainProject().subscribe((data) => {
      this.project = data;
      if (this.project) {
        this.loading = false;
        console.log(this.project);
        if (this.project?.photos) {
          this.project.photos.forEach((image) => {
            const src = this.apiLink + image;
            const thumb = this.apiLink + image;
            const album = {
              src,
              thumb,
            };
            this._albums.push(album);
          });
        }
        if (
          this.project?.latitude &&
          this.project?.longitude &&
          this.map?.hasLayer(LAYER)
        ) {
          this.addProjectMarker();
        }
      }
    });
  }
  addProjectMarker() {
    const marker = L.marker(
      [
        this.project?.latitude || 0,
        this.project?.longitude || 0,
      ],
      {
        icon,
      }
    ) .setOpacity(1)
    .bindPopup(
      (layer) => {
        return L.Util.template(
          `<div style="text-align: center";>
          ${this.project?.name?.toUpperCase()}
          </div>`,
          layer
        );
      },
      {
        minWidth: 170,
        maxWidth: 500,
        offset:  new L.Point(-18, -25)
      }
    )
    .addTo(this?.map)
    
    setTimeout(() => {
      marker.openPopup();
    }, 1000);
    this.map.fitBounds(L.latLngBounds([marker?.getLatLng()]));
  }
  async ngAfterViewInit(): Promise<void> {
    this.map = await loadMap(this.map, false, 'map');
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 800);
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
