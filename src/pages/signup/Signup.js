import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import validation from './validation';

const Signup = () => {

  //State declaration for all the input variables
const [inputValues,setinputValues]=useState({ username : '',email : '',password : '',confirm_password : '' });

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
       //create the user in db
       const createNewUser=async()=>{
        try {
              const response = await axios.post('/auth/register', inputValues);
              response.data && window.location.replace("/login");
            } catch (err) {
              console.log(err);
              setisSubmit(false);
            }    
    }; 
    createNewUser();        
  }    
},[errorMessages,inputValues,isSubmit]);


  return (
    <div className="signup">
        <span className="signupTitle">Signup</span>
                <form className="signupForm" onSubmit={handleSubmit}>
                     <label>Username</label>
                        <input
                            type="text"                                                          
                            name="username"                   
                            className="signupInput"
                            placeholder="Enter your Username..."
                            autoFocus={true}
                            required=""  
                            value={inputValues.username}                              
                            onChange={valueEntered}
                        />
                        <p className='signupError'>{errorMessages.username}</p>
                     <label>Email</label>
                        <input
                            type="text"
                            name="email" 
                            className="signupInput"
                            placeholder="Enter your Email..."
                            required=""                              
                            value={inputValues.email}                              
                            onChange={valueEntered}
                        />
                        <p className='signupError'>{errorMessages.email}</p>
                     <label>Password</label>
                        <input
                            type="password"
                            name="password" 
                            className="signupInput"
                            placeholder="Enter your password..."
                            required=""  
                            value={inputValues.password}                              
                            onChange={valueEntered}
                        />
                        <p className='signupError'>{errorMessages.password}</p>
                     <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password" 
                            className="signupInput"
                            placeholder="Enter the same password..."
                            required=""  
                            value={inputValues.confirm_password}                              
                            onChange={valueEntered}
                        />
                        <p className='signupError'>{errorMessages.confirm_password}</p>
                     <button className="signupButton">Signup</button>
                </form>
    </div>  
  )
}

export default Signup;