import {
  TICK_SIMULATION,
  PAUSE_SIMULATION,
  RESET_SIMULATION,
  START_SIMULATION,
  ADVANCE_TO_COMPLETION
} from './types';

export const tickSimulation = () => ({
  type: TICK_SIMULATION
});

export const pauseSimulation = () => ({
  type: PAUSE_SIMULATION
});

export const startSimulation = ({ nodeCount, maxTicks, stepTime }) => (dispatch, getState) => {
  const tickIfNotComplete = () => {
    const {
      simulation: {
        currentTick,
        maxTicks,
        running,
        stepTime
      }
    } = getState();
    if (running && currentTick < maxTicks) {
      dispatch(tickSimulation());
      setTimeout(tickIfNotComplete, stepTime);
    }
  };

  dispatch({
    type: START_SIMULATION,
    payload: {
      nodeCount,
      maxTicks,
      stepTime
    }
  });

  setTimeout(
    tickIfNotComplete,
    stepTime
  );
};

export const resetSimulation = () => ({
  type: RESET_SIMULATION
});

export const advanceToCompletion = () => (dispatch, getState) => {
  dispatch({
    type: ADVANCE_TO_COMPLETION
  });

  const tickIfNotComplete = () => {
    const {
      simulation: {
        currentTick,
        maxTicks,
        running,
        stepTime
      }
    } = getState();
    if (running && currentTick < maxTicks) {
      dispatch(tickSimulation());
      setTimeout(tickIfNotComplete, stepTime);
    }
  };

  if (!getState().running) {
    tickIfNotComplete();
  }
};
