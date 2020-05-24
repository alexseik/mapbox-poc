import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  airstationsUrl = '/assets/geojson/airstations.json';
  meteoStationsUrl = '/assets/geojson/meteostations.json';
  token: String;
  map: any;

  latitude = 40.415185;
  longitude = -3.694114;

  constructor(private http: HttpClient) {
    this.token = environment.mapboxToken;
    mapboxgl.accessToken = environment.mapboxToken;
  }

  getAirStations() {
    return this.http.get(this.airstationsUrl).pipe(
      map((response: any) => response.geojson)
    )
  }

  getMeteoStations() {
    return this.http.get(this.meteoStationsUrl).pipe(
      map((response: any) => response.geojson)
    )
  }

  createMap(idElement) {
    this.map = new mapboxgl.Map({
      container: idElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude],
      zoom: 11
    });
    const that = this;
    this.map.on('load', () => {
      this.getAirStations().subscribe(data => {
        that.addSource(that.map, 'airstations', data);
        that.addAirstationsLayer(that.map);
      })
      this.getMeteoStations().subscribe(data => {
        that.addSource(that.map, 'meteostations', data);
        that.addMeteostationsLayer(that.map);
      })
    })
    return this.map;
  }

  addSource(map, sourceName, data) {
    map.addSource(sourceName, {
      type: 'geojson',
      data
    })
  }

  addAirstationsLayer(map) {
    map.addLayer({
      id: 'airstationsLayer',
      type: 'circle',
      source: 'airstations',
      paint: {
        'circle-radius': {
          'base': 1.75,
          'stops': [
            [12, 10],
            [22, 180]
          ]
        },
        'circle-color': 'Black'
      }
    });
  }

  addMeteostationsLayer(map) {
    map.addLayer({
      id: 'meteostationsLayer',
      type: 'circle',
      source: 'meteostations',
      paint: {
        'circle-radius': {
          'base': 1.75,
          'stops': [
            [12, 10],
            [22, 180]
          ]
        },
        'circle-color': 'Green'
      }
    });
  }

}
