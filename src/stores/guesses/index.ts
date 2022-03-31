import { writable } from 'svelte/store';

export type Status = 'absent' | 'present' | 'correct' | 'unsubmitted';

export interface Result {
  letter: string;
  status: Status;
  index: number;
}

export interface Guess {
  word: string[];
  result: Result[];
}

export interface State {
  guesses: Guess[];
  currentTry: number;
}

const localStorageKey = 'guesses';

export const initialValue: State = {
  guesses: Array.from({ length: 6 }).fill({ word: [], result: [] }) as Guess[],
  currentTry: 0
};

const store = writable(initialValue);

export default store;

store.subscribe(value => {
  localStorage?.setItem(localStorageKey, JSON.stringify(value));
});
