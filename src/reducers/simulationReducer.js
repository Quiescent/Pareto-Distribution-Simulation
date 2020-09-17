import {
  TICK_SIMULATION,
  PAUSE_SIMULATION,
  RESET_SIMULATION,
  START_SIMULATION,
  ADVANCE_TO_COMPLETION,
  UPDATE_VISUALISATION_DATA
} from '../actions/types';

import { initialiseSimulation, tickSimulation } from '../lib/paretoSimulation';
import { associationsToVisualisationData } from '../lib/associationsToVisualisationData';

const INITIAL_STATE = {
  currentTick: 0,
  maxTicks: 1000,
  running: false,
  stepTime: 1000,
  nodeCount: 0,
  associations: [],
  display: true
};

export const simulationReducer = (state = INITIAL_STATE, { type, payload }) =>  {
  switch (type) {
  case START_SIMULATION: {
    const {
      maxTicks,
      nodeCount,
      stepTime
    } = payload;

    const initialAssociations = initialiseSimulation({ nodeCount: nodeCount });

    return {
      currentTick: 0,
      running: true,
      maxTicks,
      nodeCount,
      stepTime,
      display: true,
      associations: initialAssociations
    };
  }
  case TICK_SIMULATION: {
    const {
      maxTicks,
      currentTick,
      running,
      associations
    } = state;
    if (!running) return state;
    if (currentTick === maxTicks - 1) return {
      ...state,
      display: true,
      graphData: associationsToVisualisationData(associations),
      running: false
    };
    // Side effecting for performance reasons
    tickSimulation(associations);
    return {
      ...state,
      currentTick: currentTick + 1
    };
  }
  case RESET_SIMULATION: {
    const initialAssociations = initialiseSimulation({ nodeCount: state.nodeCount });
    return {
      ...state,
      display: true,
      running: false,
      currentTick: 0,
      associations: initialAssociations,
      graphData: associationsToVisualisationData(initialAssociations)
    };
  }
  case UPDATE_VISUALISATION_DATA: {
    const { associations } = state;
    return {
      ...state,
      graphData: associationsToVisualisationData(associations)
    };
  }
  case ADVANCE_TO_COMPLETION: {
    return {
      ...state,
      running: true,
      display: false,
      stepTime: 0
    };
  }
  case PAUSE_SIMULATION: return {
    ...state,
    running: false
  };
  default: return state;
  }
};
