import { writable } from 'svelte/store';

import type { CurrentStepCustomStore, StepCounterType } from './types';

function crateCurrentStep(): CurrentStepCustomStore {
  const stepCounter: StepCounterType = {
    past: [],
    current: 0,
    future: [],
  };

  const { subscribe, update } = writable(stepCounter);

  return {
    subscribe,
    increment: () =>
      update((counter: StepCounterType) => {
        const { past, current } = counter;

        return {
          past: [...past, current],
          current: current + 1,
          future: [],
        };
      }),
    undo: () =>
      update((counter: StepCounterType) => {
        const { past, current, future } = counter;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          current: previous,
          future: [current, ...future],
        };
      }),
    redo: () =>
      update((counter: StepCounterType) => {
        const { past, current, future } = counter;
        const next = future[0];
        const newFuture = future.slice(1);

        return {
          past: [...past, current],
          current: next,
          future: newFuture,
        };
      }),
  };
}

export const currentStep: CurrentStepCustomStore = crateCurrentStep();
