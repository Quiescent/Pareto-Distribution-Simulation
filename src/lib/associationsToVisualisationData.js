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

  const groupCounts = {};
  for (let l = 0; l < nodeCount; ++l) {
    const currentGroup = findRoot(l);
    groups[l] = currentGroup;
    if (!groupCounts[currentGroup]) groupCounts[currentGroup] = 0;
    ++groupCounts[currentGroup];
  }

  const data = [];
  let label = 0;
  Object.values(groupCounts).forEach(groupCount => {
    data.push({
      category: `${label}`,
      value: groupCount,
      valueColor: 'hsl(8, 70%, 50%)'
    });
    ++label;
  });

  // data.sort((one, other) => one.value < other.value);

  return data;
};
