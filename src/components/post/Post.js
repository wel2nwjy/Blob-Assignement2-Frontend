import React from 'react';
import { Link } from "react-router-dom";
import './Post.css';

const Post = ({post}) => {

  //Get the image from backend the path is assigned to a variable
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
        <Link to={`/post/${post._id}`} className="link">
           {post.photo && (<img className="postImg" src={PF + post.photo} alt="" />)}
        </Link>
      <div className="postInfo">
        <div className="postCats">
            {post.categories.map((c,key) => (
              <Link key={key} to={`/?cat=${c}`} className="link">
                 <span className="postCat" key={key}>{c}</span>
              </Link>              
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  )
}

export default Post;