import React, {useState, useEffect} from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPosts] = useState(null);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("/posts")
  //     .then(response => {
  //       const resp = response.data.slice(0, 4);
  //       setPosts(resp);
  //     })
  //     .catch(err => {
  //       setError(err);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/posts");
      const resp = result.data.slice(0, 4);
      setPosts(resp);
    };
    fetchData().catch(err => {
      setError(err);
    });
  }, []);

  const postSelectedHandler = id => {
    setSelectedPosts(id);
  };

  let shownPosts = posts.map(post => {
    return (
      <Post
        key={post.id}
        author={post.author}
        title={post.title}
        clicked={() => postSelectedHandler(post.id)}
      />
    );
  });

  if (error) {
    shownPosts = error.message;
  }

  return (
    <div>
      <section className="Posts">{shownPosts}</section>
      <section>
        <FullPost id={selectedPost} />
      </section>
      <section>
        <NewPost />
      </section>
    </div>
  );
};

export default Blog;
