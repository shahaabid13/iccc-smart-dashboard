export type ConversationTextPart =
  | { text: string; mention: false }
  | { text: string; mention: true };

export function splitConversationMentions(body: string): ConversationTextPart[] {
  const parts: ConversationTextPart[] = [];
  const expression = /@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*/g;
  let start = 0;
  let match: RegExpExecArray | null;

  while ((match = expression.exec(body)) !== null) {
    if (match.index > start) parts.push({ text: body.slice(start, match.index), mention: false });
    parts.push({ text: match[0], mention: true });
    start = expression.lastIndex;
  }

  if (start < body.length) parts.push({ text: body.slice(start), mention: false });
  return parts;
}

export function getMentionQuery(value: string, cursor: number): string | null {
  const beforeCursor = value.slice(0, cursor);
  const match = /(?:^|\s)@([a-zA-Z0-9._-]*)$/.exec(beforeCursor);
  return match ? match[1] : null;
}

export function insertConversationMention(value: string, cursor: number, username: string):
  { value: string; cursor: number } {
  const beforeCursor = value.slice(0, cursor);
  const match = /(?:^|\s)@([a-zA-Z0-9._-]*)$/.exec(beforeCursor);
  if (!match) return { value, cursor };

  const mentionStart = cursor - match[1].length - 1;
  const suffix = value.slice(cursor);
  const spacer = suffix.startsWith(' ') ? '' : ' ';
  const nextValue = `${value.slice(0, mentionStart)}@${username}${spacer}${suffix}`;
  return { value: nextValue, cursor: mentionStart + username.length + 1 + spacer.length };
}
