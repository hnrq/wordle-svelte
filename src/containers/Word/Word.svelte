<script lang="ts">
  import type { Result } from 'stores/guesses';
  import Letter from 'components/Letter/Letter.svelte';

  export let word: string[] = [];
  export let result: Result[] = [];
  let animation = '';
  let letters: Letter[] = [];

  export const shake = () => {
    animation = 'shake';
  };

  export const bounce = () => {
    letters.forEach(e => e.bounce());
  };
</script>

<div
  class="flex flex-row gap-x-1 word"
  data-animation={animation}
  on:animationend={() => (animation = '')}
>
  {#each Array.from({ length: 5 }) as _, index}
    <Letter
      bind:this={letters[index]}
      position={index}
      frontStyle={`transition-delay: ${250 * index}ms`}
      backStyle={`transition-delay: ${250 * index}ms`}
      letter={word[index] ?? ''}
      status={result?.[index]?.status}
      showResult={result.length > 0}
    />
  {/each}
</div>

<style>
  .word[data-animation='shake'] {
    animation: shake 0.6s;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translateX(-1px);
    }
    20%,
    80% {
      transform: translateX(2px);
    }
    30%,
    50%,
    70% {
      transform: translateX(-4px);
    }
    40%,
    60% {
      transform: translateX(4px);
    }
  }
</style>
