import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ConversationService, getMentionQuery, insertMention } from './conversation.service';

describe('ConversationService', () => {
  let service: ConversationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    });
    service = TestBed.inject(ConversationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('uses the comments pagination contract', () => {
    service.getComments('TASK', 14, 81).subscribe();
    const request = http.expectOne(req => req.url.endsWith('/api/conversations/TASK/14/comments'));
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('size')).toBe('30');
    expect(request.request.params.get('beforeId')).toBe('81');
    request.flush({ comments: [], nextBeforeId: null });
  });

  it('writes the newest visible comment id when marking read', () => {
    service.markRead('TICKET', 22, 105).subscribe();
    const request = http.expectOne(req => req.url.endsWith('/api/conversations/TICKET/22/read'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ lastCommentId: 105 });
    request.flush(null);
  });

  it('adds selected users as conversation participants', () => {
    service.addParticipants('TICKET', 31, [7, 12]).subscribe();
    const request = http.expectOne(req => req.url.endsWith('/api/conversations/TICKET/31/participants'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ userIds: [7, 12] });
    request.flush(null);
  });
});

describe('mention helpers', () => {
  it('finds an @ query at the caret and inserts the selected username', () => {
    const value = 'Please ask @ali';
    const query = getMentionQuery(value, value.length);
    expect(query).toEqual({ start: 11, query: 'ali' });
    expect(insertMention(value, query!.start, value.length, 'alice').value).toBe('Please ask @alice ');
  });

  it('does not treat email addresses as mention suggestions', () => {
    expect(getMentionQuery('mail@site.test ', 15)).toBeNull();
  });
});
