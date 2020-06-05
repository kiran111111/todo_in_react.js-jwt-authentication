import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


export default function Home(props) {

  // set the state for the user.. to be supplied in the home page
  const [user, setUser] = useState('')
  const [token,setToken]  = useState('')

  // user variable will be updated when  a new user logs in ..
  // useEffect hook works when its component renders
  useEffect(()=>{
    let newUser = localStorage.getItem('user');
    let token = localStorage.getItem('token')
    setUser(newUser)
    setToken(token)
  })


  // Structure of the home page
 return (
  <div>
        {user ? 
        <div>
          <Link to="/">Home </Link> 
          <Link to="/shop">Shop </Link>
          <Link to="/logout">Logout</Link>
          <Link to="/todolist">TodoList</Link>
         </div>
        :
        <div>
          <Link to="/">Home </Link> 
          <Link to="/register"> Register </Link> 
          <Link to="/login">Login</Link>
        </div>
         }
        
        <div>
          <h3>{user ? user : ' '} Welcome to the Home Page</h3>
      </div>
  </div>
  
 )
}
