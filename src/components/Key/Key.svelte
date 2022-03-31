<script lang="ts">
  export let value: string;
  export let onClick: (value: string) => void;
  export let size: 'medium' | 'large' = 'medium';
</script>

<div
  class="flex items-center justify-center bg-stone-500
   text-white h-16 uppercase font-bold rounded-md hover:cursor-pointer min-w-8
   focus:scale-90 ease-in transition-transform"
  class:w-9={size === 'medium'}
  class:sm:w-10={size === 'medium'}
  class:w-14={size === 'large'}
  class:sm:w-20={size === 'large'}
  on:click={() => onClick(value)}
>
  <slot />
</div>
