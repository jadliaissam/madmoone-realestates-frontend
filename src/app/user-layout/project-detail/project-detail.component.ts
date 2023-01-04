import { Component, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  public _albums : Array<any> = [];
  constructor(
    private _lightbox: Lightbox,
    private _lightboxConfig: LightboxConfig
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
         thumb: thumb
      };
      this._albums.push(album);
    }
  }

  ngOnInit(): void {
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
