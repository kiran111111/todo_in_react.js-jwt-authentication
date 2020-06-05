 
import axios from 'axios';

const API_URL = 'http://localhost:5000/'

async function createTodo(name){
  const { data: newTodo } = await axios.post(API_URL, {
    name,
  })
  return newTodo;
}

async function deleteTodo(id) {
 const {data :message} = await axios.get(`${API_URL}delete/${id}`)
 return message;
}


async function getAllTodos(){
  return  await axios.get(API_URL);
}


async function editTodos(id,payload){
  return  await axios.post(`${API_URL}edit/${id}`,payload);
 } 
 



export default {createTodo,getAllTodos,deleteTodo,editTodos};