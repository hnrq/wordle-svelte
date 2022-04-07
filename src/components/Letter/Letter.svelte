<script lang="ts" context="module">
  import type { Status } from 'stores/guesses/index';
</script>

<script lang="ts">
  export let backStyle = '';
  export let frontStyle = '';
  export let status: Status = 'unsubmitted';
  export let showResult: boolean = false;
  export let letter: string = '';
  export let position: number = 0;
  let animation = '';

  $: !letter && (animation = '');

  export const bounce = () => {
    setTimeout(() => (animation = 'bounce'), position * 100);
  };
</script>

<div
  class={`letter px-2 py-3 text-center`}
  class:show-result={showResult}
  data-animation={animation}
>
  <div class="front" style={frontStyle}>{letter}</div>
  <div
    class="back"
    class:yellow={status === 'present'}
    class:green={status === 'correct'}
    class:grey={status === 'absent'}
    style={backStyle}
  >
    {letter}
  </div>
</div>

<style lang="postcss">
  @tailwind components;

  @layer components {
    .letter {
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

    .letter[data-animation='bounce'] {
      animation: bounce 1s;
      animation-delay: 1.5s;
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
      color: theme('textColor.stone.200');
      border-width: theme('borderWidth.2');
      border-color: theme('borderColor.stone.800');
    }

    .front,
    .back {
      text-transform: uppercase;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
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

  @keyframes bounce {
    0%,
    20% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    50% {
      transform: translateY(5px);
    }
    60% {
      transform: translateY(-15px);
    }
    80% {
      transform: translateY(2px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
