import {
  getMentionQuery,
  insertConversationMention,
  splitConversationMentions
} from './conversation-mentions';

describe('conversation mention helpers', () => {
  it('splits @mentions from plain text', () => {
    expect(splitConversationMentions('Hi @bilal, see @saqib.')).toEqual([
      { text: 'Hi ', mention: false },
      { text: '@bilal', mention: true },
      { text: ', see ', mention: false },
      { text: '@saqib', mention: true },
      { text: '.', mention: false }
    ]);
  });

  it('extracts a mention query only at the cursor', () => {
    expect(getMentionQuery('Please @bil', 11)).toBe('bil');
    expect(getMentionQuery('mail@bil', 8)).toBeNull();
  });

  it('replaces the partial mention and returns the new cursor', () => {
    expect(insertConversationMention('Hi @bi there', 6, 'bilal')).toEqual({
      value: 'Hi @bilal there',
      cursor: 9
    });
  });
});
