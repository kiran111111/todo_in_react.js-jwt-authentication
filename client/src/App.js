import React from 'react';
import './App.css';
import {Route,Switch} from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import login from "./components/Login/login"
import TodoList from "./components/TodoList/TodoList";
import EditTodo from "./components/EditTodo/EditTodo";
import axios from 'axios';


function App() {

  return (
    <div className="App">
        <Route path="/" component={Home} name={localStorage.getItem("user")} />
        <Switch> 
          {/* <Route path="/todolist/:id" component={TodoList}></Route> */}
          <Route path="/todolist/" component={TodoList}></Route>  
          <Route path="/edit" component={EditTodo}></Route>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={login} />
          <Route path="/logout"  render={() =>(
             axios.defaults.headers.common['Authorization'] = null,
             localStorage.setItem('token',""),
             localStorage.setItem('user','')
          )} />
       </Switch>
    </div>
  );
}

export default App;
