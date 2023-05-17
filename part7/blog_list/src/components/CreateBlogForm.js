import { useState } from "react";

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    await handleCreateBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title:
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
        author:
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
        url:
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br></br>
        <button type="submit" id="blogSubmit">
          create
        </button>
      </form>
    </div>
  );
};

export { CreateBlogForm };
