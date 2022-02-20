import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Home.css';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {

//State declaration for all the posts
var [allPosts,setallPosts]=useState([]);

//Search property in path to know the username if any
const {search}=useLocation();

//Fetch the posts from the db
useEffect(()=>{
    const fetchPost=async()=>{
      try {
             const response =await axios.get("/posts"+search);
             setallPosts(response.data);
          } catch (err) {
      }
    }
    fetchPost();
},[search]);

    return (
        <>
          <Header/>
              <div className='home'>
                  <Posts posts={allPosts}/>
                  <Sidebar/>   
              </div>
        </>
    )
  }

export default Home;