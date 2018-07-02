const colorStore = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COLOR_INDEX": {
      const newState = JSON.parse(JSON.stringify(state));
      newState.colorIndex = action.colorIndex;
      return newState;
    }
    case "ADD_COLOR_GROUPS_OBJ": {
      const newState = JSON.parse(JSON.stringify(state));
      newState.colorGroups = action.colorGroups;
      return newState;
    }
    case "SELECT_RANDOM_COLOR": {
      const newState = JSON.parse(JSON.stringify(state));
      newState.randomColor = action.color;
      return newState;
    }
    default:
      return state;
  }
};

export default colorStore;
