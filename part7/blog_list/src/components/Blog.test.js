import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { CreateBlogForm } from "./CreateBlogForm";

describe("Blog test", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "blog title",
      author: "blog author",
      url: "www.urlurlurl.com",
      likes: 0,
      user: {
        username: "username",
        name: "name",
        id: "id",
      },
    };
    const user = {
      username: "username",
      name: "name",
      id: "id",
    };
    container = render(<Blog blog={blog} user={user} />).container;
  });

  test("a blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const blog = {
      title: "blog title",
      author: "blog author",
      url: "www.urlurlurl.com",
      likes: 0,
      user: {
        username: "username",
        name: "name",
        id: "id",
      },
    };
    const user = {
      username: "username",
      name: "name",
      id: "id",
    };
    container = render(<Blog blog={blog} user={user} />).container;
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("blog title - blog author");
    const div2 = container.querySelector(".urlAndLike");
    expect(div2).toHaveStyle("display: none");
  });

  test("a blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const blog = {
      title: "blog title",
      author: "blog author",
      url: "www.urlurlurl.com",
      likes: 0,
      user: {
        username: "username",
        name: "name",
        id: "id",
      },
    };
    const user = {
      username: "username",
      name: "name",
      id: "id",
    };
    container = render(<Blog blog={blog} user={user} />).container;
    const user1 = userEvent.setup();
    const button = container.querySelector("#viewButton");
    await user1.click(button);
    const div = container.querySelector(".urlAndLike");
    expect(div).not.toHaveStyle("display: none");
  });

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const blog = {
      title: "blog title",
      author: "blog author",
      url: "www.urlurlurl.com",
      likes: 0,
      user: {
        username: "username",
        name: "name",
        id: "id",
      },
    };
    const user = {
      username: "username",
      name: "name",
      id: "id",
    };
    const mockHandler = jest.fn();
    container = render(
      <Blog blog={blog} user={user} handleBlogLike={mockHandler} />
    ).container;
    const user1 = userEvent.setup();
    const button = container.querySelector("#viewButton");
    await user1.click(button);
    const button2 = container.querySelector("#likeButton");
    await user1.click(button2);
    await user1.click(button2);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const handleCreateBlog = jest.fn();
    const testUser = userEvent.setup();
    render(<CreateBlogForm handleCreateBlog={handleCreateBlog} />);
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button", { name: /create/i });
    await testUser.type(inputs[0], "blog title");
    await testUser.type(inputs[1], "blog author");
    await testUser.type(inputs[2], "www.urlurlurl.com");
    await testUser.click(button);
    expect(handleCreateBlog.mock.calls).toHaveLength(1);
    expect(handleCreateBlog.mock.calls[0][0].title).toBe("blog title");
    expect(handleCreateBlog.mock.calls[0][0].author).toBe("blog author");
    expect(handleCreateBlog.mock.calls[0][0].url).toBe("www.urlurlurl.com");
  });
});
