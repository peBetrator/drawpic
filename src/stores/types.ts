export type CurrentStepCustomStore = {
  subscribe: (subscription: (counter: StepCounterType) => void) => () => void;
  increment: () => void;
  undo: () => void;
  redo: () => void;
};

export type StepCounterType = {
  past: number[];
  current: number;
  future: number[];
};
