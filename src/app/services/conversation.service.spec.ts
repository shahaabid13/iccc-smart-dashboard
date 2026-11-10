import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { ConversationService } from './conversation.service';

describe('ConversationService', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let service: ConversationService;

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new ConversationService(http);
  });

  it('loads the summary and newest comments with the expected routes', () => {
    http.get.and.returnValues(
      of({ canPost: true, canManageTags: false, participants: [], unreadCount: 1 }),
      of({ comments: [], nextBeforeId: null })
    );

    service.getSummary('TASK', 28).subscribe();
    service.getComments('TASK', 28).subscribe();

    expect(http.get.calls.argsFor(0)[0]).toBe('/api/conversations/TASK/28');
    expect(http.get.calls.argsFor(1)[0]).toBe('/api/conversations/TASK/28/comments');
    expect((http.get.calls.argsFor(1)[1]?.params as HttpParams).get('size')).toBe('30');
  });

  it('uses the returned cursor and sends read and participant payloads', () => {
    http.get.and.returnValue(of({ comments: [], nextBeforeId: null }));
    http.post.and.returnValue(of(undefined));

    service.getComments('TICKET', 12, 42).subscribe();
    service.markRead('TICKET', 12, 92).subscribe();
    service.addParticipants('TICKET', 12, [18, 19]).subscribe();

    expect((http.get.calls.mostRecent().args[1]?.params as HttpParams).get('beforeId')).toBe('42');
    expect(http.post.calls.argsFor(0)).toEqual([
      '/api/conversations/TICKET/12/read',
      { lastCommentId: 92 }
    ]);
    expect(http.post.calls.argsFor(1)).toEqual([
      '/api/conversations/TICKET/12/participants',
      { userIds: [18, 19] }
    ]);
  });

  it('uses the documented comment, mention-search, and delete routes', () => {
    http.post.and.returnValue(of({ comment: { id: 92 }, ignoredMentions: [] }));
    http.put.and.returnValue(of({ id: 92 }));
    http.delete.and.returnValue(of(undefined));
    http.get.and.returnValue(of([]));

    service.postComment('TASK', 28, 'hello @bilal').subscribe();
    service.editComment('TASK', 28, 92, 'updated').subscribe();
    service.deleteComment('TASK', 28, 92).subscribe();
    service.getTaggableUsers('TASK', 28, 'bil').subscribe();

    expect(http.post.calls.mostRecent().args).toEqual([
      '/api/conversations/TASK/28/comments',
      { body: 'hello @bilal' }
    ]);
    expect(http.put.calls.mostRecent().args).toEqual([
      '/api/conversations/TASK/28/comments/92',
      { body: 'updated' }
    ]);
    expect(http.delete.calls.mostRecent().args[0]).toBe('/api/conversations/TASK/28/comments/92');
    expect(http.get.calls.mostRecent().args[0]).toBe('/api/conversations/TASK/28/taggable-users');
  });
});
