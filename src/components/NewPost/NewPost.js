import React, {useState} from "react";
import axios from "axios";

import "./NewPost.css";

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Max");
  const [error, setError] = useState(null);

  const postDataHandler = () => {
    const post = {
      title: title,
      content: content,
      author: author
    };
    axios
      .post("/posts", post)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="NewPost">
      <h1>{error}</h1>
      <h1>Add a Post</h1>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <label>Content</label>
      <textarea
        rows="4"
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <label>Author</label>
      <select value={author} onChange={event => setAuthor(event.target.value)}>
        <option value="Max">Max</option>
        <option value="Manu">Manu</option>
      </select>
      <button onClick={postDataHandler}>Add Post</button>
    </div>
  );
};

export default NewPost;
