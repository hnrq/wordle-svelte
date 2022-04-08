import { guess } from 'stores/actions';
import { writable } from 'svelte/store';

export type Status = 'absent' | 'present' | 'correct' | 'unsubmitted';

export interface Result {
  letter: string;
  status: Status;
  index: number;
}

export interface Guess {
  word: string[];
  isValid?: boolean;
  result: Result[];
}

export interface State {
  guesses: Guess[];
  currentTry: number;
  correct: boolean;
}

export const MAX_GUESSES = 6;
export const GUESS_LENGTH = 5;

const localStorageKey = 'guesses';

export const initialValue: State = JSON.parse(
  localStorage?.getItem(localStorageKey)
) ?? {
  guesses: Array.from({ length: MAX_GUESSES }).fill({
    word: [],
    result: []
  }) as Guess[],
  currentTry: 0,
  correct: false
};

const store = (() => {
  const { subscribe, update } = writable(initialValue);

  return {
    subscribe,
    guess: (result: Result[], correct: boolean) =>
      update(({ guesses, currentTry }) => ({
        guesses: guesses.map((guess, index) =>
          index === currentTry ? { ...guess, result } : guess
        ),
        currentTry: currentTry + 1,
        correct
      })),
    addLetter: (letter: string) =>
      update(state => ({
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
      })),
    removeLetter: (letter?: string) =>
      update(state => ({
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
      })),
    updateGuessValidity: (isValid: boolean) =>
      update(state => ({
        ...state,
        guesses: state.guesses.map((guess, index) =>
          index === state.currentTry
            ? {
                ...guess,
                isValid
              }
            : guess
        )
      }))
  };
})();

export default store;

store.subscribe(value => {
  localStorage?.setItem(localStorageKey, JSON.stringify(value));
});
