<script lang="ts">
  import Key from 'components/Key/Key.svelte';
  import MdBackspace from 'svelte-icons/md/MdBackspace.svelte';
  import letters from 'assets/letters.json';
  import guessesStore from 'stores/guesses/index';
  import { addGuessLetter, removeGuessLetter, guess } from 'stores/actions';

  const keys = Object.keys(letters);
  const firstLine = keys.slice(0, 9);
  const secondLine = keys.slice(10, 18);
  const thirdLine = keys.slice(19);
  let state;

  guessesStore.subscribe(currState => {
    state = currState;
  });

  const handleKey = (letter: string) => {
    let { guesses, currentTry } = state;
    if (keys.includes(letter)) addGuessLetter(letter);
    if (letter === 'Backspace') removeGuessLetter();
    if (letter === 'Enter') guess(guesses[currentTry].word);
  };
</script>

<svelte:window on:keydown={e => handleKey(e.key)} />

<div class="flex flex-col items-center justify-center gap-y-2">
  <div class="flex items-center justify-center gap-x-1">
    {#each firstLine as letter}
      <Key value={letter} onClick={handleKey}>{letter}</Key>
    {/each}
  </div>
  <div class="flex items-center justify-center gap-x-1">
    {#each secondLine as letter}
      <Key value={letter} onClick={handleKey}>{letter}</Key>
    {/each}
  </div>
  <div class="flex items-center justify-center gap-x-1">
    <Key value="Enter" onClick={handleKey} size="large">Enter</Key>
    {#each thirdLine as letter}
      <Key value={letter} onClick={handleKey}>{letter}</Key>
    {/each}
    <Key value="Backspace" onClick={handleKey} size="large">
      <div class="w-5 h-5">
        <MdBackspace />
      </div>
    </Key>
  </div>
</div>
