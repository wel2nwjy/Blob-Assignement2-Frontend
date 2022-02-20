import React from 'react';
import './Header.css';
import headerimg from '../../assets/images/header-img.jpg';

const Header = () => {
  return (
    <div className='header'>
        <img
        className="headerImg"
        src={headerimg}
        alt=""
        /> 
        <blockquote>                
                <p>"Every time you post something online, 
                    you have a choice. You can either make it something that adds to 
                    the happiness levels in the world—or you can make it something that takes away."</p><br></br>
                <h4>—Zoe Sugg</h4>
        </blockquote>  
            
    </div>
  )
}

export default Header;