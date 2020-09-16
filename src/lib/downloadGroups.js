export const downloadGroups = (data) => {
  const groupCounts = {};

  data.nodes.forEach(({ group }) => {
    if (!groupCounts[group]) groupCounts[group] = 0;
    groupCounts[group]++;
  });

  let csvText = "data:text/csv;charset=utf-8,'groupId','memberCount'\r\n";

  Object
    .keys(groupCounts)
    .sort()
    .forEach(id =>
      csvText += `${id},${groupCounts[id]}\r\n`
    );

  window.open(encodeURI(csvText));
};
