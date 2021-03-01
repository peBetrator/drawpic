<script lang="ts">
  import Canvas from './components/Canvas.svelte';
  import StepHandler from './components/StepHandler.svelte';

  import { currentStep } from './stores/index';
</script>

<main>
  <Canvas />
  {$currentStep.current}
  <StepHandler />
</main>
