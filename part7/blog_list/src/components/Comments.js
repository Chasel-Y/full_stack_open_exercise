import { useDispatch } from "react-redux";
import { useState } from "react";
import blogService from "../services/blogs";

const Comments = ({ choosedBlog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleAddComment = async (choosedBlog, comment) => {
    const updatedBlog = {
      ...choosedBlog,
      comments: choosedBlog.comments.concat(comment),
    };
    try {
      const returnedBlog = await blogService.update(choosedBlog.id, updatedBlog);
      returnedBlog.user = choosedBlog.user;
      returnedBlog.id = choosedBlog.id;
      dispatch({ type: "updateBlog", payload: { blog: returnedBlog } });
      setComment("");
      dispatch({
        type: "setNotification",
        payload: {
          content: `comment added to ${returnedBlog.title}`,
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    } catch (exception) {
      dispatch({
        type: "setError",
        payload: {
          content: "Error: cannot add comment, please relogin and try again.",
        },
      });
      setTimeout(() => {
        dispatch({ type: "notificationClear" });
      }, 5000);
    }
  };

  return(
    <div>
      <div>
        <h3>comments</h3>
        <input
          type="text"
          value={comment}
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={() => handleAddComment(choosedBlog, comment)}>add comment</button>
      </div>
      <ul>
        {choosedBlog.comments!==[] && choosedBlog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments