<script lang="ts" context="module">
  export type Status = 'absent' | 'present' | 'correct' | 'unsubmitted';
</script>

<script lang="ts">
  export let status: Status = 'unsubmitted';
  export let showResult: boolean = false;
  export let letter: string;
</script>

<div
  class={`letter-container px-2 py-3 text-center`}
  class:show-result={showResult}
>
  <div class="front">{letter}</div>
  <div
    class="back"
    class:yellow={status === 'present'}
    class:green={status === 'correct'}
    class:grey={status === 'absent'}
  >
    {letter}
  </div>
</div>

<style lang="postcss">
  @tailwind components;

  @layer components {
    .letter-container {
      position: relative;
      width: theme('width.16');
      height: theme('height.16');
      font-size: theme('fontSize.3xl');
      font-weight: theme('fontWeight.bold');
      line-height: theme('lineHeight.none');
      text-align: center;
      transition-property: transform;
      transition-duration: theme('transitionDuration.500');
    }

    .show-result .back {
      transform: rotateX(0);
    }

    .show-result .front {
      transform: rotateX(-180deg);
    }

    .back {
      transform: rotateX(180deg);
    }

    .front {
      border-width: theme('borderWidth.2');
      border-color: theme('borderColor.slate.500');
    }

    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
      transition-property: transform;
      transition-duration: theme('transitionDuration.500');
    }

    .green,
    .yellow,
    .grey {
      color: theme('textColor.white');
      transform: rotateX(180deg);
    }

    .green {
      background-color: theme('backgroundColor.emerald.500');
    }

    .grey {
      background-color: theme('borderColor.slate.500');
    }

    .yellow {
      background-color: theme('backgroundColor.amber.500');
    }
  }
</style>
