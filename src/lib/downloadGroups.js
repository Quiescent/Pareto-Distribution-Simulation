export const downloadGroups = (data) => {
  let csvText = "data:text/csv;charset=utf-8,'groupId','memberCount'\r\n";

  data
    .sort((one, other) => one.value < other.value)
    .forEach(({ category, value }) =>
      csvText += `${category},${value}\r\n`
    );

  window.open(encodeURI(csvText));
};
