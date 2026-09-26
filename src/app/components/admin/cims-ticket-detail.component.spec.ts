import { of } from 'rxjs';
import { CimsTicketDetailComponent } from './cims-ticket-detail.component';

describe('CimsTicketDetailComponent workflow', () => {
  let component: CimsTicketDetailComponent;
  let cimsService: any;
  let snackBar: any;
  let router: any;
  let location: any;
  let authService: any;

  beforeEach(() => {
    localStorage.setItem('username', 'ali');
    localStorage.setItem('role', 'FIELD_PERSON');

    cimsService = {
      resolveTicket: jasmine.createSpy('resolveTicket').and.returnValue(of({ id: 42, status: 'RESOLVED' })),
      revalidateTicket: jasmine.createSpy('revalidateTicket').and.returnValue(of({ id: 42, status: 'OPEN' })),
      getTicketById: jasmine.createSpy('getTicketById').and.returnValue(of({
        id: 42,
        status: 'OPEN',
        fieldPersonId: 12,
        fieldPersonName: 'Ali',
        incidentTypeName: 'Signal',
        locationName: 'Main Road',
        raisedByUsername: 'support',
        history: []
      })),
      getFieldPersonQueue: jasmine.createSpy('getFieldPersonQueue').and.returnValue(of({ content: [] })),
      getReviewQueue: jasmine.createSpy('getReviewQueue').and.returnValue(of({ content: [] })),
      getMyTickets: jasmine.createSpy('getMyTickets').and.returnValue(of({ content: [] })),
      getAssignableFieldPersons: jasmine.createSpy('getAssignableFieldPersons').and.returnValue(of([]))
    };

    snackBar = { open: jasmine.createSpy('open') };
    router = { navigate: jasmine.createSpy('navigate') };
    location = { back: jasmine.createSpy('back') };
    authService = {
      getRole: () => 'FIELD_PERSON'
    };

    component = new CimsTicketDetailComponent(
      { params: of({ id: '42' }) } as any,
      cimsService,
      authService,
      router,
      snackBar,
      location
    );

    component.ticket = {
      id: 42,
      status: 'OPEN',
      fieldPersonId: 12,
      fieldPersonName: 'Ali',
      incidentTypeName: 'Signal',
      locationName: 'Main Road',
      raisedByUsername: 'support',
      priority: 'MEDIUM',
      description: 'Issue',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'support',
      raisedByUserId: 99,
      history: []
    } as any;
  });

  it('should allow field person actions when the ticket is assigned to the logged-in field person', () => {
    expect(component.canShowFieldPersonActions()).toBeTrue();
  });

  it('should reject past and today dates for reassignment validation', () => {
    const today = new Date();
    const past = new Date(today.getTime() - 86400000);

    expect(component.isFutureDateValid(past)).toBeFalse();
    expect(component.isFutureDateValid(today)).toBeFalse();
  });

  it('should call the resolved API when the field person resolves the ticket', () => {
    component.resolveTicket();
    expect(cimsService.resolveTicket).toHaveBeenCalledWith(42, jasmine.any(String));
  });

  it('should call the revalidation API when the field person returns the ticket for revalidation', () => {
    component.revalidateTicket('Needs review');
    expect(cimsService.revalidateTicket).toHaveBeenCalledWith(42, 'Needs review');
  });
});
