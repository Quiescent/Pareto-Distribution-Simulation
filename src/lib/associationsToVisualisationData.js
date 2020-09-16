export const associationsToVisualisationData = ({ associations }) => {
  const nodeCount = associations.length;
  const groups = new Array(nodeCount);
  const findRoot = (current) => {
    while (associations[current] !== current) {
      current = associations[current];
      if (groups[current]) return groups[current];
    }
    return current;
  };

  // Omit links and see whether it works first...
  const graphData = {
    nodes: [],
  };

  for (let l = 0; l < nodeCount; ++l) {
    groups[l] = findRoot(l);
    graphData.nodes.push({
      id: l,
      group: groups[l]
    });
  }

  return graphData;
};
