<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import LineThickness from './components/LineThickness.svelte';
  import Pallete from './components/Palette.svelte';
  import StepHandler from './components/StepHandler.svelte';

  let strokeColor: string = '#000';
  let strokeWidth: number = 1;
</script>

<main>
  <div class="container">
    <Canvas {strokeColor} {strokeWidth} />
    <div class="stroke__style">
      <Pallete bind:strokeColor />
      <LineThickness bind:strokeWidth />
    </div>
  </div>
  <StepHandler />
</main>

<style>
  .container {
    display: flex;
  }

  .stroke__style {
    padding-left: 5px;
  }
</style>
