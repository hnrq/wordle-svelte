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

const store = writable(initialValue);

export default store;

store.subscribe(value => {
  localStorage?.setItem(localStorageKey, JSON.stringify(value));
});
