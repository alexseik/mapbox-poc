import { MapService } from './map.service';
import { asyncData } from 'src/test-utils';

describe('MapService', () => {
  let service: MapService;
  let httpClientSpy: { get: jasmine.Spy };
  const fakeResponse = {
    geojson: {
      type: "FeatureCollection",
      features: []
    }
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MapService(<any>httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve geojson property from airstations', () => {
    httpClientSpy.get.and.returnValue(asyncData(fakeResponse));

    service.getAirStations().subscribe(
      geojson => expect(geojson).toEqual(fakeResponse.geojson, 'expected parsed geojson')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });



  it('should retrieve geojson property from meteostations', () => {
    httpClientSpy.get.and.returnValue(asyncData(fakeResponse));

    service.getMeteoStations().subscribe(
      geojson => expect(geojson).toEqual(fakeResponse.geojson, 'expected parsed geojson')
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should create a new Map instance', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'mapId');
    debugger
    document.getElementsByTagName('body')[0].appendChild(div);
    const map = service.createMap('mapId');
    expect(map).toBeTruthy();
  })
});
