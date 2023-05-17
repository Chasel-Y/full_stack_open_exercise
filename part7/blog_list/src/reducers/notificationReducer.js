const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case "setNotification":
    return {
      informationType: "notification",
      content: action.payload.content,
    };
  case "setError":
    return {
      informationType: "error",
      content: action.payload.content,
    };
  case "notificationClear":
    return {};
  default:
    return state;
  }
};

export default notificationReducer;
