import { AfterViewInit, Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

import * as L from 'leaflet';

import { loadMap, icon, LAYER } from 'src/app/shared/shared.functions';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  map: any;
  public _albums: Array<any> = [];
  constructor(
    private _lightbox: Lightbox,
    _lightboxConfig: LightboxConfig
  ) {
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.fitImageInViewPort = false;

    for (let i = 1; i <= 5; i++) {
      const src = 'assets/img/products/gallery' + i + '.png';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/products/gallery' + i + '.png';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
      };
      this._albums.push(album);
    }
  }

  ngOnInit(): void {
    if (this.map?.hasLayer(LAYER)) {
      this.addProjectMarker();
    }
  }

  addProjectMarker() {
    const marker = L.marker([33.5747276, -7.6267051], {
      icon,
    });
    // console.log(this?.map);
    marker?.addTo(this?.map);
    if(this.map){
      this.map.invalidateSize();
    }
    this.map.fitBounds(L.latLngBounds([marker?.getLatLng()]));
  }
  async ngAfterViewInit(): Promise<void> {
    this.map = await loadMap(this.map, false, 'map');
    // if (this.project?.latitude && this.project?.longitude) {
    // }
    this.addProjectMarker();
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
