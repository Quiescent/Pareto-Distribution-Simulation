export const initialiseSimulation = ({ nodeCount }) => {
  const initialConditions = new Array(nodeCount);
  for (let l = 0; l < nodeCount; ++l) {
    initialConditions[l] = l;
  }
  return {
    associations: initialConditions
  };
};

const MAX_TRIALS = 1000;

const selectRandom = (upperBound, dontSelect = null) => {
  let selection = Math.floor(upperBound * Math.random());
  let counter = 0;

  while (selection === dontSelect) {
    ++counter;
    selection = Math.floor(upperBound * Math.random());
    if (counter > MAX_TRIALS) break;
  }

  return selection;
};

const findRoot = (associations, current) => {
  while (associations[current] !== current) {
    current = associations[current];
  }
  return current;
};

export const tickSimulation = ({ associations }) => {
  const itemCount = associations.length;
  const selectionOne = selectRandom(itemCount);
  const selectionTwo = selectRandom(itemCount, selectionOne);

  const rootOne = findRoot(associations, selectionOne);
  const rootTwo = findRoot(associations, selectionTwo);

  // Dont form loops in the associations!
  if (rootOne !== rootTwo) associations[rootOne] = selectionTwo;
};
