<script>
  import Keyboard from 'containers/Keyboard/Keyboard.svelte';
  import Guesses from 'containers/Guesses/Guesses.svelte';

  const today = new Intl.DateTimeFormat('en-US').format(new Date());
  if (today !== localStorage.getItem('date')) localStorage.clear();

  localStorage.setItem('date', today);
</script>

<div
  class="flex flex-col gap-y-8 items-center justify-between h-full w-full
  bg-stone-900 py-8"
>
  <Guesses />
  <Keyboard />
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    padding: 0;
  }
</style>
