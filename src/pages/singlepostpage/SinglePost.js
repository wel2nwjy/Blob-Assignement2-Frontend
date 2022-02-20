import React from 'react';
import './SinglePost.css';
import PostInfo from '../../components/postinfo/PostInfo';
import Sidebar from '../../components/sidebar/Sidebar';

const SinglePost = () => {
  return (
    <div className="single">
         <PostInfo/>
         <Sidebar />
    </div>
  )
}

export default SinglePost;