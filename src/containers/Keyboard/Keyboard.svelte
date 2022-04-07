<script lang="ts">
  import Key from 'components/Key/Key.svelte';
  import MdBackspace from 'svelte-icons/md/MdBackspace.svelte';
  import letters from 'assets/letters.json';
  import guessesStore, { MAX_GUESSES } from 'stores/guesses/index';
  import keyboardStore from 'stores/keyboard/index';
  import type { State as GuessesState } from 'stores/guesses/index';
  import type { State as KeyboardState } from 'stores/keyboard/index';
  import {
    addGuessLetter,
    removeGuessLetter,
    guess,
    isGuessValid
  } from 'stores/actions';

  const keys = Object.keys(letters);
  const firstLine = keys.slice(0, 10);
  const secondLine = keys.slice(10, 19);
  const thirdLine = keys.slice(19);
  let guessesState: GuessesState;
  let keyboardState: KeyboardState;

  keyboardStore.subscribe(state => {
    keyboardState = state;
  });

  guessesStore.subscribe(state => {
    guessesState = state;
  });

  const handleKey = async (letter: string) => {
    if (guessesState.currentTry <= MAX_GUESSES && !guessesState.correct) {
      let { guesses, currentTry } = guessesState;
      if (keys.includes(letter)) addGuessLetter(letter);
      if (letter === 'Backspace') removeGuessLetter();
      if (letter === 'Enter') {
        const isValid = await isGuessValid(guesses[currentTry].word);
        if (isValid) guess(guesses[currentTry].word);
      }
    }
  };
</script>

<svelte:window on:keydown={e => handleKey(e.key)} />

<div class="flex flex-col items-center justify-center gap-y-2">
  <div class="flex items-center justify-center gap-x-1">
    {#each firstLine as letter}
      <Key value={letter} onClick={handleKey} status={keyboardState[letter]}
        >{letter}</Key
      >
    {/each}
  </div>
  <div class="flex items-center justify-center gap-x-1">
    {#each secondLine as letter}
      <Key value={letter} onClick={handleKey} status={keyboardState[letter]}
        >{letter}</Key
      >
    {/each}
  </div>
  <div class="flex items-center justify-center gap-x-1">
    <Key value="Enter" onClick={handleKey} size="large">Enter</Key>
    {#each thirdLine as letter}
      <Key value={letter} onClick={handleKey} status={keyboardState[letter]}
        >{letter}</Key
      >
    {/each}
    <Key value="Backspace" onClick={handleKey} size="large">
      <div class="w-5 h-5">
        <MdBackspace />
      </div>
    </Key>
  </div>
</div>
