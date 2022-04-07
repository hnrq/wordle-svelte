import { mergeKeyboard } from 'utils';
import guessesStore from './guesses';
import keyboardStore from './keyboard';

export const addGuessLetter = (letter: string) =>
  guessesStore.update(state => ({
    ...state,
    guesses: state.guesses.map((guess, index) =>
      index === state.currentTry
        ? {
            ...guess,
            word:
              guess.word.length <= 5
                ? [...guess.word, letter.toLowerCase()]
                : guess.word
          }
        : guess
    )
  }));

export const removeGuessLetter = (letter?: string) =>
  guessesStore.update(state => ({
    ...state,
    guesses: state.guesses.map((guess, index) =>
      index === state.currentTry
        ? {
            ...guess,
            word: letter
              ? guess.word.filter(currLetter => currLetter !== letter)
              : guess.word.slice(0, -1)
          }
        : guess
    )
  }));

export const isGuessValid = async (word: string[]) => {
  const response = await (
    await fetch(`${process.env.API_HOST}/${word.join('')}/valid`)
  ).json();

  guessesStore.update(state => ({
    ...state,
    guesses: state.guesses.map((guess, index) =>
      index === state.currentTry
        ? {
            ...guess,
            isValid: Boolean(response)
          }
        : guess
    )
  }));

  return Boolean(response);
};

export const guess = async (word: string[]) => {
  const response = await (
    await fetch(`${process.env.API_HOST}/guess/${word.join('')}`)
  ).json();

  const correct = response.result.every(result => result.status === 'correct');

  guessesStore.update(({ guesses, currentTry }) => ({
    guesses: guesses.map((guess, index) =>
      index === currentTry
        ? {
            ...guess,
            result: response.result
          }
        : guess
    ),
    currentTry: currentTry + 1,
    correct
  }));

  keyboardStore.update(currValue =>
    mergeKeyboard(currValue, response.keyboard)
  );
};
