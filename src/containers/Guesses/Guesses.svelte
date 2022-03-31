<script lang="ts">
  import Word from 'containers/Word/Word.svelte';
  import guessesStore from 'stores/guesses';

  let store;

  guessesStore.subscribe(value => {
    store = value;
  });
</script>

<div class="flex flex-col gap-y-2">
  {#each Array.from({ length: 6 }) as _, index}
    <Word
      result={store.guesses[index]?.result ?? []}
      word={store.guesses[index]?.word}
    />
  {/each}
</div>
