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
    sessionStorage.setItem('username', 'ali');
    sessionStorage.setItem('role', 'FIELD_PERSON');

    cimsService = {
      resolveTicket: jasmine.createSpy('resolveTicket').and.returnValue(of({ id: 42, status: 'RESOLVED' })),
      revalidateTicket: jasmine.createSpy('revalidateTicket').and.returnValue(of({ id: 42, status: 'OPEN' })),
      reopenTicket: jasmine.createSpy('reopenTicket').and.returnValue(of({ id: 42, status: 'REOPENED' })),
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
    const attachmentService = {
      getAttachments: jasmine.createSpy('getAttachments').and.returnValue(of([])),
      uploadAttachments: jasmine.createSpy('uploadAttachments').and.returnValue(of({ uploaded: 0, failed: 0 }))
    };
    authService = {
      getRole: () => 'FIELD_PERSON'
    };

    component = new CimsTicketDetailComponent(
      { params: of({ id: '42' }) } as any,
      cimsService,
      authService,
      router,
      snackBar,
      location,
      attachmentService as any
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

  it('should hide field person actions after the ticket is sent for revalidation', () => {
    component.ticket = { ...component.ticket!, status: 'REVALIDATION' };
    expect(component.canShowFieldPersonActions()).toBeFalse();
  });

  it('should reject past and today dates for reassignment validation', () => {
    const today = new Date();
    const past = new Date(today.getTime() - 86400000);

    expect(component.isFutureDateValid(past)).toBeFalse();
    expect(component.isFutureDateValid(today)).toBeFalse();
  });

  it('should reveal reassignment without reopening and hide it after a successful assignment', () => {
    authService.getRole = () => 'SUPPORT_ENGINEER';
    sessionStorage.setItem('username', 'support');
    component.ticket = { ...component.ticket!, status: 'REVALIDATION', raisedByUsername: 'support' };
    cimsService.reassignTicket = jasmine.createSpy('reassignTicket').and.returnValue(of({
      id: 42,
      status: 'OPEN',
      scheduledDate: '2026-10-02'
    }));
    component.eligibleFieldPersons = [{ id: 8, name: 'Field Person', role: 'FIELD_PERSON', phone: '' }];
    component.selectedFieldPersonId = 8;
    component.scheduledDate = new Date();
    component.scheduledDate.setDate(component.scheduledDate.getDate() + 2);

    expect(component.canShowSupportEngineerActionPanel()).toBeTrue();
    component.showReassignmentForm();
    expect(cimsService.reopenTicket).not.toHaveBeenCalled();
    expect(component.canShowSupportEngineerAssignmentPanel()).toBeTrue();

    component.assignToFieldPerson();

    expect(component.assignmentSubmitted).toBeTrue();
    expect(component.canShowSupportEngineerAssignmentPanel()).toBeFalse();
    expect(component.canShowSupportEngineerActionPanel()).toBeFalse();
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
