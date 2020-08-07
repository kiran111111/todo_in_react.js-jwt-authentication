import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
// const API_URL = process.env.REACT_APP_URL;


export async function registerUser(user){
  return await axios.post(`/register`,user)
}


export function loginUser(user){
 const data =   axios.post(`/login`,user);
 return data;
} 


export function goToShop(user){
 const data = axios.get(`/shop`)
 return data;
} 


export default {registerUser,loginUser,goToShop};




// /register := for registering user and recieving token and user details
// /login    := for authenticating users and the token should be in the headers