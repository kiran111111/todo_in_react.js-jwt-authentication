import React, {useState} from 'react';
import {loginUser} from "../../sign";
import {Redirect} from "react-router-dom";
import Error from "../Error/Error";
import styles from "../Register/Register.module.css";


import axios from "axios";
// const apiUrl = 'http://localhost:5000';


export default function Login() {

  // Set the user on change of the inputs in the form 
  const [user, setUser] = useState({username : '',password :"",name :''})
  const [log,setLogin]  = useState({login : false,user : ''});
  const [error,setErrorMessage] = useState()

 
  

  // handles the form inputs....--the state changes on change
  function handleChange(evt) {
   const value = evt.target.value;
   setUser({
     ...user,
     [evt.target.name]: value
   });
  }



  // function to login route
  const handleLogin = async (event) => {
    event.preventDefault()
    await loginUser(user)
    .then((res) =>{
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user",res.data.user.name)
       let token = localStorage.getItem('token') ;
       let user = localStorage.getItem('user')
       console.log('token is '+ token)

       if(token){
         setLogin({
          login : true,
          user : user
          })  

          const token = localStorage.getItem('token')
          if(token){
            axios.defaults.headers.common['Authorization'] = token;
            console.log(axios.defaults.headers)
          }
        }
        
    }).catch((err) => {
      console.log(err.response)
      const errorMessage = err.response.data.error;
      setErrorMessage(errorMessage)
      console.log(error)
    });
  }

  


  const  renderToHome = () => {
    return <Redirect 
        to={{
          pathname: '/',
          user: { name: log.user }
      }}
    />
  }



  return (
    <form onSubmit={handleLogin}  className={styles.form}>
       {(log.login === true) ? renderToHome() : ""}
      <h1 className={styles.title}>Login </h1>
      {/* display the error message */}
      {error && <Error error={error} />}

      <label className={styles.label}>username</label>
      <input
        className={styles.inputField}
        name='username'
        placeholder='Username'
        value={user.username}
        onChange={(e) => handleChange(e)}
        /><br/>


      <label className={styles.label}>Password</label>
      <input
        className={styles.inputField}
        type='password'
        name='password'
        placeholder='Password'
        value={user.password}
        onChange={(e) => handleChange(e)}
        /><br/>

      <input  className={styles.button} type='submit'/>
    </form>
  )
}
