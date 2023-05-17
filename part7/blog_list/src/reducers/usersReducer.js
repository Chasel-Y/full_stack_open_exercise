const usersReducer = (state = { allusers: null, user: null }, action) => {
  switch (action.type) {
  case "getAllUsers":
    return { ...state, allusers: action.payload.users };
  case "setUser":
    return { ...state, user: action.payload.user };
  case "userClear":
    return { ...state, user: null };
  default:
    return state;
  }
};

export default usersReducer;
