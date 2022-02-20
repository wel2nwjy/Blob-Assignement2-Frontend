import axios from 'axios';
import React,{useEffect, useState,useContext} from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import './PostInfo.css';

const PostInfo = () => {

  const { user } = useContext(Context);

  //Get the image from backend the path is assigned to a variable
  const PF = "http://localhost:5000/images/";

  //To get the path we use uselocation from which the post id extracted
  const location = useLocation();
  const pathID = location.pathname.split("/")[2];

  //State variable for post
  const [singlePost,setsinglePost]=useState({})

  //State variable to update title and the content of the post
  const [updateValues,setupdateValues]=useState({title:'',desc:''})

 //State variable to know if the user is wishes to edit the post
 const [updateMode, setUpdateMode] = useState(false);

  //fetch the post as per the id from the path
  useEffect(()=>{
    const getPost=async()=>{
      const response=await axios.get(`/posts/${pathID}`);
      setsinglePost(response.data);
    }
    getPost();
  },[pathID])
  
  //For storing the values entered
  const valueEntered=(event)=>{
    const { name, value } = event.target; //destructuring
    setupdateValues({ ...updateValues, [name]: value });
    console.log(updateValues.desc);
  };

  //Delete Opereation
  const handleDelete = async () => {
    var proceed = window.confirm("Are you sure to delete this post permanently?");
      if (proceed) {
        //proceed
        try {
          await axios.delete(`/posts/${singlePost._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      }    
  };

  //Update Operation
  const handleUpdate = async () => {
    try {
      const response=await axios.put(`/posts/${singlePost._id}`, {
        username: user.username,
        title: updateValues.title,
        desc: updateValues.desc
      });
      setsinglePost(response.data);
      setUpdateMode(false)
    } catch (err) {}
  };


  //Cancel Operation
  const handleCancel = async () => {
    setUpdateMode(false);
    assignUpdatevariable();
  };

  //Assign Update Variable and change the mode of the update   
  const assignUpdatevariable = async () => {
    var name1="title";
    var name2="desc";
    setupdateValues({ ...updateValues, [name1]: singlePost.title, [name2]: singlePost.desc });
  };

  const initiateUpdate = async () => {
    setUpdateMode(true);
    assignUpdatevariable();
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">

        {singlePost.photo && (
          <img src={PF+singlePost.photo} alt="" className="singlePostImg" />
        )}

         {updateMode ? (
                            <input
                              type="text"
                              name="title"
                              value={updateValues.title}
                              className="singlePostTitleInput"
                              autoFocus
                              onChange={valueEntered}
                            />
                       ) : (
                              <h1 className="singlePostTitle">
                                {singlePost.title}
                                    {singlePost.username === user?.username && (
                                    <div className='singlePostEdit'>
                                        <i className="fa-solid fa-trash-can singlePostIcon" onClick={handleDelete}></i>
                                        <i className="fa-solid fa-pen-to-square singlePostIcon" onClick={initiateUpdate}></i><br></br><br></br>              
                                    </div>    
                                    )} 
                                </h1>                                          
                            )}
        
             
            <div className='singlePostInfo'>
                <span className='singlePostAuthor'>
                  Author: <Link to={`/?user=${singlePost.username}`} className="link">
                   <b> {singlePost.username}</b>
                  </Link></span>
                <span className='singlePostDate'>{new Date(singlePost.createdAt).toDateString()}</span>  
            </div>

            {updateMode ? (
                            <textarea
                              name="desc"
                              className="singlePostDescInput"
                              value={updateValues.desc}
                              onChange={valueEntered}
                            />
                          ) : (
                                 <p className='singlePostDesc'>{singlePost.desc}</p>
                              )}

            {updateMode && (
                          <div className='singlePostEdit'>
                                <button className="singlePostButton" onClick={handleUpdate}>
                                  Update
                                </button>

                                <button className="singlePostButton" onClick={handleCancel}>
                                  Cancel
                                </button>
                          </div>          
                        )}
            
      </div>
    </div>
  )
}

export default PostInfo;