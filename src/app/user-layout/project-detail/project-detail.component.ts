import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

import * as L from 'leaflet';

import {
  loadMap,
  icon,
  LAYER,
  getApiBaseUrl,
} from 'src/app/shared/shared.functions';
import { ProjectService } from 'src/app/services/project.service';
import {
  IProject,
  IProjectEquipement,
  IRoomEquipement,
} from 'src/app/entities/all.entity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipementModalComponent } from 'src/app/shared/equipement-modal/equipement-modal.component';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public loading = false;
  map: any;
  project: IProject | null = null;
  apiLink = getApiBaseUrl();
  horizontalViewMode = true;

  public _albums: Array<any> = [];
  constructor(
    private _lightbox: Lightbox,
    private projectService: ProjectService,
    private modalService: NgbModal,
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
    this.projectService.getUserMainProject().subscribe(
      (data) => {
        this.project = data;
        this.loading = false;
        if (this.project) {
          if (this.project?.photos) {
            this.project.photos.forEach((image) => {
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
          if (
            this.project?.latitude &&
            this.project?.longitude &&
            this.map?.hasLayer(LAYER)
          ) {
            this.addProjectMarker();
          }
          
        }
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  
  addProjectMarker() {
    const marker = L.marker(
      [this.project?.latitude || 0, this.project?.longitude || 0],
      {
        icon,
      }
    )
      .setOpacity(1)
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
          offset: new L.Point(-18, -25),
        }
      )
      .on('click', () => {
        // open google maps with the marker location
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${this.project?.latitude},${this.project?.longitude}`
        );
      })
      .addTo(this?.map);

    setTimeout(() => {
      marker.openPopup();
    }, 1000);
    this.map.fitBounds(L.latLngBounds([marker?.getLatLng()]));
  }
  async ngAfterViewInit(): Promise<void> {
    this.map = await loadMap(this.map, false, 'map');
    this.map?.invalidateSize();
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 800);
  }

  // open equipement modal (create new component) showing name icon (if exist) and description
  openModal(equipement: IProjectEquipement) {
    console.log(equipement);
    // call modal component equipement and give equipement as in put
    const modalRef = this.modalService.open(EquipementModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.equipement = equipement;
  }
  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map?.off();
      this.map?.remove();
    }
  }
}
