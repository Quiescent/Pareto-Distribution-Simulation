import {
  TICK_SIMULATION,
  PAUSE_SIMULATION,
  RESET_SIMULATION,
  START_SIMULATION,
  ADVANCE_TO_COMPLETION,
  UPDATE_VISUALISATION_DATA
} from './types';

export const tickSimulation = () => ({
  type: TICK_SIMULATION
});

export const pauseSimulation = () => ({
  type: PAUSE_SIMULATION
});

const VISUALISATION_UPDATE_TIME = 1000;
const MAX_NODES_TO_VISUALISE = 1000;

export const updateVisualisationData = () => (dispatch, getState) => {
  const updateIfNotComplete = () => {
    const { simulation: { running, nodeCount } } = getState();
    if (running && nodeCount <= MAX_NODES_TO_VISUALISE) {
      dispatch({
        type: UPDATE_VISUALISATION_DATA
      });
      setTimeout(updateIfNotComplete, VISUALISATION_UPDATE_TIME);
    }
  };

  dispatch({
    type: UPDATE_VISUALISATION_DATA
  });

  setTimeout(
    updateIfNotComplete,
    VISUALISATION_UPDATE_TIME
  );
};

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

  if (nodeCount <= MAX_NODES_TO_VISUALISE) {
    dispatch(updateVisualisationData());
  }

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
