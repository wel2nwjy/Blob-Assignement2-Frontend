import React,{ useContext } from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Write from './pages/write/Write';
import SinglePost from './pages/singlepostpage/SinglePost';
import { Context } from "./context/Context";
import './App.css';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={user ? <Home/> : <Signup/>}/>
        <Route path="/login" element={user ? <Home/> : <Login/>}/>
        <Route path="/write" element={user ? <Write/> : <Signup/>}/>
        <Route path="/post/:postId" element={<SinglePost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
