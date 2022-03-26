<script lang="ts">
  import Letter from '@components/Letter/Letter.svelte';
  import { letterStatus } from '@utils/index';

  const correctWord = localStorage.getItem('correctWord');

  export let word: string;
  export let submitted: boolean = false;
</script>

<div class="flex flex-row gap-x-4">
  {#each word.toLowerCase().split('') as letter, index}
    <Letter
      {letter}
      status={letterStatus(correctWord, letter, index)}
      showResult={submitted}
    />
  {/each}
</div>
