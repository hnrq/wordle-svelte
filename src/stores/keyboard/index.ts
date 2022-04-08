import { writable } from 'svelte/store';

import letters from 'assets/letters.json';

import type { Status } from '../guesses';
import { mergeKeyboard } from '@utils/index';

export type State = Record<keyof typeof letters, Status | 'unused' | string>;

const localStorageKey = 'keyboard';

export const initialValue: State =
  JSON.parse(localStorage?.getItem(localStorageKey)) ?? letters;

const store = (() => {
  const { subscribe, update } = writable(initialValue);

  return {
    subscribe,
    updateKeys: (value: State) =>
      update(keyboard => mergeKeyboard(keyboard, value))
  };
})();

store.subscribe(value => {
  localStorage?.setItem(localStorageKey, JSON.stringify(value));
});

export default store;
