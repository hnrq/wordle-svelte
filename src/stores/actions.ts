import guessesStore, { GUESS_LENGTH } from './guesses';
import keyboardStore from './keyboard';

export const isGuessValid = async (word: string[]) => {
  const response = await (
    await fetch(`${process.env.API_HOST}/${word.join('')}/valid`)
  ).json();
  const isValid = Boolean(response) && word.length === GUESS_LENGTH;
  guessesStore.updateGuessValidity(isValid);
  return isValid;
};

export const guess = async (word: string[]) => {
  const { keyboard, result } = await (
    await fetch(`${process.env.API_HOST}/guess/${word.join('')}`)
  ).json();
  const correct = result.every(result => result.status === 'correct');

  guessesStore.guess(result, correct);
  keyboardStore.updateKeys(keyboard);
};
