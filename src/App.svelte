<script>
  import Word from 'containers/Word/Word.svelte';

  const guess = 'guess';
  const result = `${process.env.API_HOST}/daily?guess=${guess}`;
</script>

<div>
  <Word word={guess} />
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
