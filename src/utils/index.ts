export const letterStatus = (
  word: string = '',
  letter: string,
  index: number
) => {
  if (word.toLowerCase().charAt(index) === letter.toLowerCase())
    return 'correct';
  if (word.toLowerCase().indexOf(letter.toLowerCase()) !== -1)
    return 'misplaced';
  return 'incorrect';
};
