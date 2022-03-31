<script lang="ts">
  import type { Result } from 'stores/guesses';
  import Letter from 'components/Letter/Letter.svelte';

  export let word: string[] = [];
  export let result: Result[] = [];
</script>

<div class="flex flex-row gap-x-1 word">
  {#each Array.from({ length: 5 }) as _, index}
    <Letter
      frontStyle={`transition-delay: ${200 * index}ms`}
      backStyle={`transition-delay: ${200 * index}ms`}
      letter={word[index] ?? ''}
      status={result?.[index]?.status}
      showResult={result.length > 0}
    />
  {/each}
</div>
