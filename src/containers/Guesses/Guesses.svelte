<script lang="ts">
  import { onDestroy } from 'svelte';
  import Word from 'containers/Word/Word.svelte';
  import type { State as GuessesState } from 'stores/guesses';
  import guessesStore, { MAX_GUESSES } from 'stores/guesses';

  let store: GuessesState;
  let guesses: Word[] = [];

  const unsubscribe = guessesStore.subscribe((value: GuessesState) => {
    if (
      value?.guesses[value.currentTry]?.isValid === false &&
      store?.guesses[value.currentTry]?.isValid !==
        value?.guesses[value.currentTry]?.isValid
    )
      guesses?.[store?.currentTry ?? 0]?.shake();

    if (value.correct) guesses?.[store?.currentTry ?? 0]?.bounce();
    store = value;
  });

  onDestroy(unsubscribe);
</script>

<div class="flex flex-col gap-y-2">
  {#each Array.from({ length: MAX_GUESSES }) as _, index}
    <Word
      bind:this={guesses[index]}
      result={store.guesses[index]?.result ?? []}
      word={store.guesses[index]?.word}
    />
  {/each}
</div>
