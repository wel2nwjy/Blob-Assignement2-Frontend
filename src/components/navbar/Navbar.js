import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";
import './Navbar.css';

function Navbar() {

  const { user,dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='navbar'>
            <div className='top-left'>
               <h2 className="logo">My Blog</h2>
            </div>
            
            <div className='top-center'>
                <ul className='top-list'>

                    <li className='top-list-items effect01'>
                       <span><Link className='link' to='/'>Home</Link></span>
                    </li>

                    <li className='top-list-items effect01'>
                       <span><Link className='link' to='/'>About</Link></span>
                    </li>

                    <li className='top-list-items effect01'>
                       <span><Link className='link' to='/'>Contact</Link></span>
                       
                    </li>

                    <li className= 'top-list-items effect01'>
                      <span>
                          <Link className='link' to='/write'>Write</Link> 
                      </span>                   
                    </li>

                    <li className='top-list-items effect01' onClick={handleLogout}><span>{user && "LOGOUT"}</span></li>
                </ul>
            </div>
            <div className='top-right'>
              {user ? (
                        <div className='bgtext'>
                           <span className="topUsername">{user.username}</span>
                        </div>
                      ) : (
                            <ul className="top-list">
                             <li className="top-list-items effect01">
                                <span><Link className="link" to="/login">
                                  LOGIN
                                </Link></span>
                              </li>
                              <li className="top-list-items effect01">
                                 <span><Link className="link" to="/register">
                                  SIGNUP
                                 </Link></span>
                              </li>
                            </ul>
                          )}                    
               <i className="topSearchIcon fa-solid fa-user"></i> 
            </div> 
    </div>
  )
}

export default Navbar;