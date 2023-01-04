import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';

export const icon = L.icon({
  iconUrl: './assets/img/marker.svg',
//  popupAnchor: [13, 0],
  iconAnchor: [30, 30],
  iconSize: [24, 30],
});


export async function loadMap(map: any, zoomControls = true, mapID='map') {
  map = L.map(mapID, {
    center: [31.794525, -7.0849336],
    zoom: 5,
    layers : [LAYER],
    zoomControl: zoomControls,
  });
  //LAYER.addTo(map);
  return map;
}

export const LAYER = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  id: 'mapbox/streets-v11',
})
