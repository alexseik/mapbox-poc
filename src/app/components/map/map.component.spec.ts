import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapService } from 'src/app/services/map.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  let mapServiceSpy: { createMap: jasmine.Spy };

  beforeEach(async(() => {
    mapServiceSpy = jasmine.createSpyObj('MapService', ['createMap']);

    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MapService.createMap on init', () => {
    expect(mapServiceSpy.createMap.calls.count()).toBe(1, 'one call');
  })
});
