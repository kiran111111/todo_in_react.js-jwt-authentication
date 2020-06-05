import React,{useEffect,useState} from 'react'
import Todo from '../../Todo';
import Error from "../Error/Error";
import styles from './TodoList.module.css';
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';



export default function TodoList() {

 const [todo,setTodo] = useState('');
 const [todos,setTodos] = useState([])
 const [error,setErrorMessage] = useState();



 const fetchTodoAndSetTodos = async () => {
    await Todo.getAllTodos()
    .then(res =>{
      // console.log(res)
      const todos = res.data;
      setTodos(todos)
    }).catch(err=>{
      // console.log(err.response)
      const errorMessage = err.response.data.message;
      setErrorMessage(errorMessage)
      // console.log(err.response.data.message)
      // console.log(error)
    })
  }

  useEffect(() => {
    fetchTodoAndSetTodos()
  },[])


  const createTodos = async e =>{
    e.preventDefault();
    if(!todo){
    alert("please enter something")
    return
  }
    const newTodo = await Todo.createTodo(todo);
    setTodos([...todos,newTodo]);
    setTodo("")
    fetchTodoAndSetTodos()
  }


  const deleteTodos = async (e, id) => {
    e.stopPropagation()
    const todos = await Todo.deleteTodo(id)
    setTodos(todos)
  }



 return (
  <div className={styles.container}>

   {/* display the error message */}
   {error && <Error error={error} />}

   {error ? "" : 
    <>
     <p className={styles.title}>Here are all your todos</p>
    <div>
      <label htmlFor="name"></label>
      <input 
        className={styles.todoInput}
        type="text"
        id="name" 
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        name="name">
      </input>
      <button
        className={styles.button,styles.add}
        type="button" 
        onClick={createTodos}
       >
        Add
      </button>
  </div>
    <div className={styles.todolist}>
      <ul>
        {todos.map(({name,_id},i)=>{
          return (
            <li key={i}>
                {name}
            <span className={styles.deleteIcon} onClick={e => deleteTodos(e, _id)}> 
               <i className="fa fa-trash"></i>
             </span>
            <Link className={styles.editIcon} to={{
              pathname:"/edit/"+_id,
              editProps:{
                    todo : name,
                    id : _id
                    }
                  }}> 
                <i className="fa fa-edit"></i>
              </Link>
            </li>
            )
        })}
      </ul>
     </div>
    </>
    }
  </div>
 )
}
