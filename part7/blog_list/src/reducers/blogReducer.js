const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "setBlogs":
    return action.payload.blogs;
  case "createBlog":
    return [...state, action.payload.blog];
  case "updateBlog":
    return state.map((blog) =>
      blog.id === action.payload.blog.id ? action.payload.blog : blog
    );
  case "deleteBlog":
    return state.filter((blog) => blog.id !== action.payload.blog.id);
  default:
    return state;
  }
};

export default blogReducer;
