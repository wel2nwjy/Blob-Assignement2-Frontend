import React from 'react';
import './Posts.css';
import Post from '../post/Post';

const Posts = (props) => {

  const posts=props.posts;

  return (
    <div className='posts'>
      {posts.map((post,key)=>{
        return  <Post post={post} key={key}/>
      })}
    </div>
  )
}

export default Posts