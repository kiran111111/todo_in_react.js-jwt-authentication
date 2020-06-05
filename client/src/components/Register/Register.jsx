import React, {useState} from 'react';
import {registerUser} from "../../sign";
import {Redirect} from "react-router-dom";
import Error from "../Error/Error";

  
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
   setUser({
     ...user,
     [evt.target.name]: value
   });
  }

  

  // validate before refistering user
  const registerValidation = () =>{

    var passpat = /^[a-zA-Z0-9-_][^(?|#|*|@|&|\.\ )]{7,20}$/;
    const {username,name,password} = user;

    // console.log(user)
    let nameError = "";
    let userNameError = "";
    let passwordError = "";

    if(!name){
      nameError = 'name cannot be blank'
    }
    if(!username){
      userNameError = 'username cannot be blank'
    }
    // console.log(username.includes("@"))
    if (!username.includes("@")) {
      userNameError = "invalid email";
    }

    if(passpat.test(password) === false ){
      passwordError =  "Atleast one uppercase ,of 8 letters, no spaces , no Special symbol";
    }

    if(nameError || userNameError  || passwordError){
      setUser({nameError,userNameError,passwordError,username:username,name:name});
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
    <form onSubmit={handleRegister}>
      {(state.registered  === true) ? renderRedirect() : ""}
      {error && <Error error={error} />}
      <h1>Sign Up For An Account</h1>

      <label>username</label>
      <input
        name='username'
        placeholder='Username'
        value={user.username}
        onChange={(e) => handleChange(e)}
        /><br/>
      <div>{user.userNameError}</div>  


     <label>name</label>
      <input
        name='name'
        placeholder='nmae'
        value={user.name}
        onChange={(e) => {
          handleChange(e)
          }
        }
      />
      <br/> 
      <div>{user.nameError}</div>  

      <label>Password</label>
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={user.password}
        onChange={(e) => handleChange(e)}
        /><br/>
        <div>{user.passwordError}</div>  

      <input type='submit'/>
    </form>
  )
}

