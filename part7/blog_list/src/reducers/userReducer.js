const userReducer = (state = null, action) => {
  switch (action.type) {
  case "setUser":
    return action.payload.user;
  case "userClear":
    return null;
  default:
    return state;
  }
};

export default userReducer;
