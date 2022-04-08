<script lang="ts">
  import type { Status } from 'stores/guesses';

  export let status: Omit<Status, 'unsubmitted'> | 'unused' = 'unused';
  export let value: string;
  export let onClick: (value: string) => void;
  export let size: 'medium' | 'large' = 'medium';
</script>

<div
  class="key bg-stone-500 h-16 uppercase min-w-8"
  class:bg-amber-500={status === 'present'}
  class:bg-emerald-500={status === 'correct'}
  class:bg-stone-800={status === 'absent'}
  class:text-stone-700={status === 'absent'}
  class:w-9={size === 'medium'}
  class:sm:w-10={size === 'medium'}
  class:w-14={size === 'large'}
  class:sm:w-20={size === 'large'}
  on:click={() => onClick(value)}
>
  <slot />
</div>

<style lang="postcss">
  @tailwind components;

  @layer components {
    .key {
      font-weight: theme('fontWeight.bold');
      border-radius: theme('borderRadius.md');
      color: theme('textColor.white');
      transition-property: background-color;
      transition-delay: 1.5s;
      transition-duration: theme('transitionDuration.200');
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .key:hover {
      cursor: theme('cursor.pointer');
    }

    .key:focus {
      transform: theme('scale.90');
    }
  }
</style>
