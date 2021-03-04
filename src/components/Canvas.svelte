<script lang="ts">
  import { onDestroy } from 'svelte';

  import { currentStep, history } from '../stores/index';
  import type { StepCounterType } from '../stores/types';

  export let strokeColor: string;
  export let strokeWidth: number;

  const drawHandler = (): void => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let started: boolean = false;

    const unsubscribe: () => void = currentStep.subscribe((stepStore: StepCounterType) => {
      const { current } = stepStore;

      if (canvas) {
        context.putImageData($history[current], 0, 0);
      }
    });

    // Initialization sequence.
    const init = (): void => {
      // Find the canvas element.
      canvas = document.getElementById('canvas') as HTMLCanvasElement;

      // Get the 2D canvas context.
      context = canvas.getContext('2d');

      if ($history.length === 0) {
        history.update(() => [context.getImageData(0, 0, 500, 500)]);
      }

      // Attach the mousedown, mousemove and mouseup event listeners.
      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mousemove', mousemove);
      canvas.addEventListener('mouseup', mouseup);
    };

    const mousemove = (ev: MouseEvent) => {
      if (started) {
        context.lineTo(ev.clientX, ev.clientY);
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;

        context.stroke();
      }
    };

    const mousedown = (ev: MouseEvent) => {
      context.beginPath();
      context.moveTo(ev.clientX, ev.clientY);
      started = true;
    };

    const mouseup = (ev: MouseEvent) => {
      if (started) {
        mousemove(ev);
        started = false;

        history.update((items: ImageData[]) => {
          return [...items.slice(0, $currentStep.current + 1), context.getImageData(0, 0, 500, 500)];
        });
        currentStep.increment();
      }
    };

    init();
  };

  // Keep everything in anonymous function, called on window load.
  if (window.addEventListener) {
    window.addEventListener('load', drawHandler);
  }

  // onDestroy(unsubscribe);
</script>

<div class="canvas__wrapper">
  <canvas id="canvas" width="500px" height="500px" />
  {strokeColor}
</div>

<style>
  .canvas__wrapper {
    width: 500px;
    border: 1px solid #000;
  }
</style>
