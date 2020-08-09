 
import axios from 'axios';

const API_URL = 'http://localhost:5000'
// const API_URL = process.env.REACT_APP_URL;

async function createTodo(name){
  const { data: newTodo } = await axios.post("", {
    name,
  })
  return newTodo;
}

async function deleteTodo(id) {
 const {data :message} = await axios.get('/delete/'+id)
 console.log(message)
 return message;
}


async function getAllTodos(){
  return  await axios.get("/todolist");
}


async function editTodos(id,payload){
  return  await axios.post(`/edit/${id}`,payload);
 } 
 



export default {createTodo,getAllTodos,deleteTodo,editTodos};