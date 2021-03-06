import React, {useState} from 'react';
import {registerUser} from "../../sign";
import {Redirect} from "react-router-dom";
import Error from "../Error/Error";
import styles from "./Register.module.css";

  
const initialState = {
  username : '',
  name :'',
  password :'',
  userNameError:'',
  nameError:'',
  passwordError:'',
  userIsValid :false
}



export default function Register(props) {

  const [user, setUser] = useState(initialState)
  const [state,setState]  = useState({registered : false});
  const [error,setErrorMessage] = useState()

// handle input change event
  function handleChange(evt) {
   const value = evt.target.value;
   setUser({...user,
     [evt.target.name]: value
   });
  }

  

  // validate before refistering user
  const registerValidation = () =>{

    var passpat = /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/;
    const {username,name,password} = user;

    // console.log(user)
    let nameError = "";
    let userNameError = "";
    let passwordError = "";

    if(!name){
      nameError = 'Name cannot be blank'
    }
    if(!username){
      userNameError = 'Username cannot be blank'
    }
    // console.log(username.includes("@"))
    if (!username.includes("@")) {
      userNameError = "Invalid email";
    }
  
    if(passpat.test(password) === false ){
      passwordError =  "Atleast one uppercase , 8-15 Characters , Atleast one number and  No spaces ";
    }

    if(nameError || userNameError  || passwordError){
      setUser({
        nameError,
        userNameError,
        passwordError,
        username:username,
        name:name,
        password:password
      });
      // console.log(user)
      return false;
    }
    return true;
  }



  // try this
  // Step Two Part B: onChange handler calls this method

// handle register route
  const handleRegister  = async (event)=>{
    event.preventDefault();
    
   const isValid = registerValidation()
    if(isValid){
      await registerUser(user)
        .then(function(res){
            localStorage.setItem('token',res.data.token)
            if(res.data.token){
              setState({
                registered : true
              })   
            }    
        }).catch((err) => {
          // console.log(err.response)
          const errorMessage = err.response.data.error;
            setErrorMessage(errorMessage)
            // console.log(error)
      });
    }
  }


  // renderRedirect();
  const renderRedirect = () => {
    return <Redirect to='/' />
  }



  return (
    <form onSubmit={handleRegister} className={styles.form}>
      {(state.registered  === true) ? renderRedirect() : ""}
      {error && <Error error={error} />}
      <h1 className={styles.title}>Sign Up For An Account</h1>

      <label className={styles.label}>Username</label>
      <input
        className={styles.inputField}
        name='username'
        placeholder='Username.'
        value={user.username}
        onChange={(e) => handleChange(e)}
        /><br/>
      <div className={styles.validationError}>{user.userNameError}</div>  


     <label className={styles.label}>Name</label>
      <input
        className={styles.inputField}
        name='name'
        placeholder='Name..'
        value={user.name}
        onChange={(e) => {
          handleChange(e)
          }
        }
      />
      <br/> 
      <div  className={styles.validationError}>{user.nameError}</div>  

      <label className={styles.label}>Password</label>
      <input
        className={styles.inputField}
        type='password'
        name='password'
        placeholder='Password..'
        value={user.password}
        onChange={(e) => handleChange(e)}
        /><br/>
        <div  className={styles.validationError}>{user.passwordError}</div>  

      <input className={styles.button} type='submit'/>
    </form>
  )
}

