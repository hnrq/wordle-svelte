import { letterStatus } from '.';

describe('Utils', () => {
  it('returns correct if the character is present in the word at the index provided', () => {
    expect(letterStatus('Word', 'o', 1)).toBe('correct');
  });

  it('returns misplaced if the character is present in the word but not at the index provided', () => {
    expect(letterStatus('Word', 'o', 2)).toBe('misplaced');
  });

  it('returns incorrect if the character is not present in the word', () => {
    expect(letterStatus('Word', 'a', 2)).toBe('incorrect');
  });
});
