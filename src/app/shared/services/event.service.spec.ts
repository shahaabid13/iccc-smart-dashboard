import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EventService } from './event.service';
import { EventSearchRequest } from '../models/traffic-dashboard.dtos';

describe('EventService', () => {
  let service: EventService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(EventService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts the Events search to the backend without forcing a serverId unless it is supplied', () => {
    const request: EventSearchRequest = {
      serverId: 7,
      startTimestamp: 1000,
      endTimestamp: 2000,
      page: 1,
      limit: 20,
      lpNumber: 'JK01AB1234',
      channelId: '12',
      applicationId: 'ANPR'
    };

    service.searchEvents(request).subscribe();

    const testRequest = http.expectOne('/api/events/search');
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toEqual({
      serverId: 7,
      starttimestamp: 1000,
      endtimestamp: 2000,
      page: 1,
      limit: 20,
      lpnumber: 'JK01AB1234',
      channelid: '12',
      applicationid: 'ANPR'
    });
    testRequest.flush({ totalrecords: 0, totalpages: 0, currentpage: 1, eventlist: [] });
  });
});
