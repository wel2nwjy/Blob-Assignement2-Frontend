import React,{ useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { Context } from "../../context/Context";
import validation from './validation';

const Login = () => {
  
  const { dispatch, isFetching } = useContext(Context);
  

//State declaration for all the input variables
  var [inputValues,setinputValues]=useState({username:'',password:''});

//State declaration for all the error messages
  var [errorMessages,seterrorMessages]= useState({});

//State to verify success on submit
  const [isSubmit,setisSubmit]=useState(false);

//For storing the values entered
  const valueEntered=(event)=>{
    const { name, value } = event.target; //destructuring
    setinputValues({ ...inputValues, [name]: value });
    setisSubmit(false);
  };

//Manage from getting refreshed
   const handleSubmit=(event)=>{
    event.preventDefault();
    seterrorMessages(validation(inputValues));    
    setisSubmit(true);
  };

//
useEffect(()=>{
    if(Object.keys(errorMessages).length===0 && isSubmit){
        //check the user is valid;
        dispatch({ type: "LOGIN_START" });
        const UserValidation=async()=>{
          try {
                const response = await axios.post('/auth/login', inputValues);
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
              } catch (err) {
                dispatch({ type: "LOGIN_FAILURE" });
                setisSubmit(false);
              }
      }; 
      UserValidation(); 
    }    
  },[errorMessages,inputValues,dispatch,isSubmit]);

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
                <form className="loginForm" onSubmit={handleSubmit}>
                     <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="loginInput"
                            placeholder="Enter your username..."
                            autoFocus={true}
                            required="password"
                            value={inputValues.username} 
                            onChange={valueEntered}
                        />
                        <p className='loginError'>{errorMessages.username}</p>
                     <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="loginInput"
                            placeholder="Enter your password..."
                            required=""
                            value={inputValues.password} 
                            onChange={valueEntered}
                        />
                        <p className='loginError'>{errorMessages.password}</p>
                     <button className="loginButton" type='submit' disabled={isFetching}>Login
                         <span style={{color:"red", marginTop:"10px"}}></span>
                     </button>
                </form>
    </div>   
  )
}

export default Login;