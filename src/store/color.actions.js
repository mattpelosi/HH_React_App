let initialIndex = 0;

export const addColorIndex = colorIndex => ({
  type: "ADD_COLOR_INDEX",
  colorIndex,
  index: initialIndex++
});

export const selectRandomColor = color => ({
  type: "SELECT_RANDOM_COLOR",
  color,
  index: initialIndex++
});

export const addColorGroupsObj = colorGroups => ({
  type: "ADD_COLOR_GROUPS_OBJ",
  colorGroups,
  index: initialIndex++
});
