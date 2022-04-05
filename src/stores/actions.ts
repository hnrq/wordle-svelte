import { mergeKeyboard } from 'utils';
import guessesStore from './guesses';
import keyboardStore from './keyboard';

export const addGuessLetter = (letter: string) =>
  guessesStore.update(({ guesses, currentTry }) => ({
    guesses: guesses.map((guess, index) =>
      index === currentTry
        ? {
            ...guess,
            word:
              guess.word.length <= 5
                ? [...guess.word, letter.toLowerCase()]
                : guess.word
          }
        : guess
    ),
    currentTry
  }));

export const removeGuessLetter = (letter?: string) =>
  guessesStore.update(({ guesses, currentTry }) => ({
    guesses: guesses.map((guess, index) =>
      index === currentTry
        ? {
            ...guess,
            word: letter
              ? guess.word.filter(currLetter => currLetter !== letter)
              : guess.word.slice(0, -1)
          }
        : guess
    ),
    currentTry
  }));

export const guess = async (word: string[]) => {
  const response = await (
    await fetch(`${process.env.API_HOST}/${word.join('')}`)
  ).json();

  guessesStore.update(({ guesses, currentTry }) => ({
    guesses: guesses.map((guess, index) =>
      index === currentTry
        ? {
            ...guess,
            result: response.result
          }
        : guess
    ),
    currentTry: currentTry + 1
  }));

  keyboardStore.update(currValue =>
    mergeKeyboard(currValue, response.keyboard)
  );
};
