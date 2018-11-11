import {AfterViewInit, Injectable, OnInit} from '@angular/core';
import {latLng, LatLng} from "leaflet";
import {BehaviorSubject} from "rxjs";
import {ServiceInitStatus} from "../personality/personality.service";

var defaultKey: string = 'default';

@Injectable()
export class MapService {
  map: Map<string, MapInfo> = new Map<string, MapInfo>();
  subjectMap: Map<string, BehaviorSubject<MapInfo>> = new Map<string, BehaviorSubject<MapInfo>>();
  tehran: LatLng = latLng(35.6892, 51.3890);

  constructor() {
  }

  init(key?) {
    if(!key)
      this.defaultReset();
    this.reset(key);
  }

  defaultInit() {
    this.init(defaultKey);
  }

  reset(key) {
    let mapInfo = this.getMapInfo(key)
    mapInfo.marker = null;
    this.getSubject(key).next(mapInfo);
  }

  defaultReset() {
    this.reset(defaultKey);
  }

  afterChangeState(key: string): BehaviorSubject<MapInfo> {
    return this.subjectMap.get(key);
  }

  private getMapInfo(key) {
    let mapInfo = this.map.get(key);
    if(!mapInfo) {
      mapInfo = new MapInfo(this.tehran, null, 12);
      this.map.set(key, mapInfo);
      this.subjectMap.set(key, new BehaviorSubject<MapInfo>(mapInfo));
    }
    return mapInfo;
  }

  private getSubject(key) {
    return this.subjectMap.get(key);
  }

  setCenter(key, center: LatLng) {
    let mapInfo = this.getMapInfo(key);
    mapInfo.center = center;
    this.getSubject(key).next(mapInfo);
  }

  setDefaultCenter(center: LatLng) {
    this.setCenter(defaultKey, center);
  }

  getCenter(key?): LatLng {
    if(!key)
      return this.getMapInfo(defaultKey).center;
    return this.getMapInfo(key).center;
  }

  setMarker(key, marker: LatLng) {
    let mapInfo = this.getMapInfo(key);
    mapInfo.center = marker;
    mapInfo.marker = marker;
    this.getSubject(key).next(mapInfo);
  }

  setDefaultMarker(marker: LatLng) {
    this.setMarker(defaultKey, marker)
  }

  getMarker(key?): LatLng {
    // console.log(key)
    // console.log(this.getMapInfo(defaultKey))
    if(!key)
      return this.getMapInfo(defaultKey).marker;
    return this.getMapInfo(key).marker;
  }

  setZoom(key, zoom: number) {
    let mapInfo = this.getMapInfo(key);
    mapInfo.zoom = zoom;
    this.getSubject(key).next(mapInfo)
  }

  setDefaultZoom(key, zoom: number) {
    this.setZoom(defaultKey, zoom);
  }

  getZoom(key?): number {
    if(!key)
      return this.getMapInfo(defaultKey).zoom;
    return this.getMapInfo(key).zoom;
  }

  toLatLng(lat, lng): LatLng {
    if(!lat || !lng)
      return null;
    return latLng(lat, lng);
  }
}

class MapInfo {
  marker: LatLng;
  center: LatLng;
  zoom: number;

  constructor(center: LatLng, marker: LatLng, zoom: number) {
    this.center = center;
    this.marker = marker;
    this.zoom = zoom;
  }
}
