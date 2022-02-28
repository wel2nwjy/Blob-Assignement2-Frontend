import React,{ useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './Sidebar.css';


const Sidebar = () => {

//State variable for categories
const [cats, setCats] = useState([]);

//Fetch the categories from db
useEffect(()=>{
  const fetchCategories= async () => {
    const response = await axios.get("/categories");
    setCats((response.data));   
  };
  fetchCategories();  
},[])

console.log("cats",cats)
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt=""
        />
        <p>
           I am dedicated,a bit of a introvert and open-minded. 
           I get across to people and adjust to changes but always loose touch the ones around in time.
           I believe that a person should work on developing their professional skills and
            learning new things all the time because there is no end to knowing more.
           Hoping one day i will be able to reach to those opportunities.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cats.map((c,i) => (
            <Link key={i} to={`/?cat=${c.name}`} className="link">
               <li key={c._id}  className="sidebarListItem">{c.name}</li>
            </Link>
          ))} 
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;