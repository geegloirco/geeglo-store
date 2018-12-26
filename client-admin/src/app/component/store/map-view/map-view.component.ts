import {Component, Input, OnInit} from '@angular/core';
import {control, LatLng, latLng, Map, marker, tileLayer} from "leaflet";
import {MapService} from "../../../service/map-service/map.service";

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  @Input()
  name: string = 'default';


  constructor(
    public mapService: MapService) {
  }

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      ],
      zoom: this.mapService.getZoom(this.name),
      center: this.mapService.getCenter(this.name)
    };

    this.mapService.afterChangeState(this.name).subscribe(res => {
      this.mapCenter = res.center;
      this.layers = [];
      if(res.marker) {
        this.layers.push(marker(res.marker));
        this.mapCenter = res.marker;
      }
    });
  }

  setMarker(marker: LatLng) {
    this.mapService.setMarker(name, marker);
  }

  options = null;

  layers = [
  ];

  mapCenter: LatLng;
  map = null;
  selectedLocation = null;

  onMapReady(map: Map) {
    this.map = map;
  }

  mapOnClick(evt) {
    this.selectedLocation = {
      latitude: evt['latlng']['lat'],
      longitude: evt['latlng']['lng']
    };

    this.mapService.setMarker(this.name, evt['latlng']);
  }

  clearMarker() {
    this.selectedLocation = null;
    this.layers = [];
  }
}
