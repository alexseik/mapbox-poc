import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.createMap('map');
  }

  airStationsToggle(event) {
    this.mapService.toogleLayer('airstationsLayer', event.target.checked)
  }

  meteoStationsToggle(event) {
    this.mapService.toogleLayer('meteostationsLayer', event.target.checked)
  }

}
