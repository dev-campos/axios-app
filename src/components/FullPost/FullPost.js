import React, {useState, useEffect} from "react";
import axios from "axios";

import "./FullPost.css";

const FullPost = props => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.id) {
        const result = await axios("/posts/" + props.id);
        setPost(result.data);
      }
    };
    fetchData().catch(err => {
      setError(err.message);
    });
  }, [props.id]);

  const deletePostHandler = () => {
    axios
      .delete("/posts/" + props.id)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  let shownPost = <p style={{textAlign: "center"}}>Please select a Post!</p>;
  if (props.id) {
    shownPost = <p style={{textAlign: "center"}}>Loading...</p>;
  }
  if (post) {
    shownPost = (
      <div className="FullPost">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <div className="Edit">
          <button onClick={deletePostHandler} className="Delete">
            Delete
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    shownPost = (
      <div className="FullPost">
        <h1>{error}</h1>
      </div>
    );
  }

  return shownPost;
};

export default FullPost;
