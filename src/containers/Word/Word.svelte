<script lang="ts">
  import type { Status } from 'components/Letter/Letter.svelte';
  import Letter from 'components/Letter/Letter.svelte';

  interface ResultItem {
    letter: string;
    status: Status;
    index: number;
  }

  export let word: string = '';
  export let result: ResultItem[] = [];
</script>

<div class="flex flex-row gap-x-4">
  {#if result.length > 0}
    {#each word.split('') as letter, index}
      <Letter
        {letter}
        status={result[index]?.status}
        showResult={result.length > 0}
      />
    {/each}
  {/if}
</div>
