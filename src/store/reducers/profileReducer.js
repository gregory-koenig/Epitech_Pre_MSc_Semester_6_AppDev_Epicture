const initialState = { profile: [] };

function setProfile(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'SET_PROFILE':
      nextState = {
        ...state,
        profile: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default setProfile;
