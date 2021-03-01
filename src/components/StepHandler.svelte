<script lang="ts">
  import { onDestroy } from 'svelte';

  import { currentStep, history } from '../stores/index';
  import type { StepCounterType } from '../stores/types';

  let isPrevDisabled: boolean;
  let isNextDisabled: boolean;

  const unsubscribe: () => void = currentStep.subscribe((stepStore: StepCounterType) => {
    const { current } = stepStore;
    const historyLength = $history.length;

    isPrevDisabled = current === 0;
    isNextDisabled = historyLength === 0 || historyLength === current + 1;
  });

  const handlePreviousStep = (): void => {
    currentStep.undo();
  };

  const handleNextStep = (): void => {
    currentStep.redo();
  };

  onDestroy(unsubscribe);
</script>

<div>
  <button on:click={handlePreviousStep} disabled={isPrevDisabled}>Ctrl+Z (previous)</button>
  <button on:click={handleNextStep} disabled={isNextDisabled}>Ctrl+Shift+Z (next)</button>
</div>
