import React from 'react';
import axios from 'axios';



export async function registerUser(user){
  return await axios.post('http://localhost:5000/register',user)
}


export function loginUser(user){
 const data =   axios.post('http://localhost:5000/login',user);
 return data;
} 


export function goToShop(user){
 const data = axios.get('http://localhost:5000/shop')
 return data;
} 


export default {registerUser,loginUser,goToShop};




// /register := for registering user and recieving token and user details
// /login    := for authenticating users and the token should be in the headers