import React,{useState,useEffect} from 'react'
import Todo from "../../Todo";
import styles from "./EditTodo.module.css";
import Error from "../Error/Error";
import {Redirect} from "react-router-dom";

export default function EditTodo(props) {


 let vars = props.location.editProps;

 const [editTodo,setEditTodo] = useState(vars && vars.todo);
 const [state,setState]  = useState({edited : false});
 const [error,setErrorMessage] = useState();


 const handleChange = (e) =>{
   setEditTodo(e.target.value);
 }


  const updateTodos = async (id,payload) =>{
      await Todo.editTodos(id,payload)
       .then(res =>{
        //  console.log(res);
         const todos = res.data;
         setState({edited : true})
       }).catch(err=>{
        console.log(err.response)
        const errorMessage = err.response.data.message;
        setErrorMessage(errorMessage)
        console.log(err.response.data.message)
        console.log(error)
       })
   }


   // renderRedirect();
  const redirectToTodo = () => {
    return <Redirect to='/todolist' />
  }


 return (
  <div className={styles.container}>
  {(state.edited  === true) ? redirectToTodo() : ""}
   <p className={styles.title}>Welcome to the edit page  { vars && ` of ${vars.id}`}</p>

  {/* display the error message */}
  {error && <Error error={error} />}

  {error ? "" : 
    <>
    <input
      className={styles.editInput}
      type="text"
      value={ 
        editTodo  
      }
      onChange={(e) => handleChange(e)}
    ></input>
    <button 
        className={styles.button}
        onClick={() => {
      updateTodos(vars && vars.id,
      {name : editTodo}
      )}}
    >Edit</button>
    </>
  }
  </div>
 )
}
