import { useSelector } from "react-redux";

const NotificationMessage = () => {
  const message = useSelector((state) => state.notifications);
  if (!message) {
    return null;
  }

  return <div className={message.informationType}>{message.content}</div>;
};

export { NotificationMessage };
