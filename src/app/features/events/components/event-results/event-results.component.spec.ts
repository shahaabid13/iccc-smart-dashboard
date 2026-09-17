import { EventResultsComponent } from './event-results.component';
import { ExternalEventSearchResponse } from '../../../../shared/models/traffic-dashboard.dtos';

describe('EventResultsComponent', () => {
  const router = {
    getCurrentNavigation: () => undefined,
    navigate: jasmine.createSpy('navigate')
  } as any;
  const eventService = {} as any;
  const snackBar = { open: jasmine.createSpy('open') } as any;

  beforeEach(() => {
    history.replaceState({}, '', location.href);
  });

  it('uses response.eventlist as the table data', () => {
    const response: ExternalEventSearchResponse = {
      totalrecords: 1,
      totalpages: 1,
      currentpage: 1,
      eventlist: [{
        eventid: 1,
        alerttype: 2,
        alertname: 'ANPR',
        channelid: 10,
        channelname: 'Gate 1',
        eventlocation: 'Srinagar',
        eventtime: '2026-09-12T10:00:00',
        message: 'Vehicle detected',
        action: '',
        clipurl: '',
        latitude: 34,
        longitude: 74,
        sender: 'VMS'
      }]
    };
    history.replaceState({ searchResponse: response }, '', location.href);

    const component = new EventResultsComponent(router, eventService, snackBar);
    component.ngOnInit();

    expect(component.events()).toEqual(response.eventlist);
    expect(component.totalRecords()).toBe(1);
    expect(component.errorMessage()).toBeNull();
  });

  it('keeps an empty eventlist as a normal empty state', () => {
    history.replaceState({
      searchResponse: { totalrecords: 0, totalpages: 0, currentpage: 1, eventlist: [] }
    }, '', location.href);

    const component = new EventResultsComponent(router, eventService, snackBar);
    component.ngOnInit();

    expect(component.events()).toEqual([]);
    expect(component.errorMessage()).toBeNull();
  });

  it('reports a VMS error when server 100 failed in a partial response', () => {
    history.replaceState({
      searchResponse: {
        totalrecords: 0,
        totalpages: 0,
        currentpage: 1,
        eventlist: [],
        partial: true,
        failedServerIds: [100]
      }
    }, '', location.href);

    const component = new EventResultsComponent(router, eventService, snackBar);
    component.ngOnInit();

    expect(component.errorMessage()).toContain('VMS server 100');
  });
});
