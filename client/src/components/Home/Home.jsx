import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
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
  <div className={styles.container}>
        {user ? 
        <div className={styles.navbar}>
          <div><Link to="/" className={styles.link}> Home </Link> </div>
          <div><Link to="/todolist" className={styles.link}>TodoList</Link></div>
          <div><Link to="/logout" className={styles.link}>Logout</Link></div>
         </div>
        :
        <div  className={styles.navbar}>
            <div><Link to="/" className={styles.link}>Home </Link> </div>
            <div><Link to="/register" className={styles.link}> Register </Link> </div>
            <div> <Link to="/login" className={styles.link}>Login</Link></div>
        </div>
         }
        
        <div>
          <h3 className={styles.title}>
            {user ? 
              <span className={styles.username}>
                 {user} 
              </span>
                  : 
              ' '
            } 
             Welcome to the Home Page
         </h3>
      </div>
  </div>
 )
}
