import { writable } from 'svelte/store';

import letters from 'assets/letters.json';

import type { Status } from '../guesses';

export type State = Record<keyof typeof letters, Status | 'unused' | string>;

const localStorageKey = 'keyboard';

export const initialValue: State =
  JSON.parse(localStorage?.getItem(localStorageKey)) ?? letters;

const store = writable(initialValue);

export default store;

store.subscribe(value => {
  localStorage?.setItem(localStorageKey, JSON.stringify(value));
});
