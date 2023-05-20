const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case "setNotification":
    return {
      informationType: "notification is-success is-light",
      content: action.payload.content,
    };
  case "setError":
    return {
      informationType: "notification is-danger -is-light",
      content: action.payload.content,
    };
  case "notificationClear":
    return {};
  default:
    return state;
  }
};

export default notificationReducer;
