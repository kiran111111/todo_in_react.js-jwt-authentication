import React,{useEffect,useState} from 'react';
import {goToShop} from "../../sign";
import Error from "../Error/Error";

export default function Shop(){

 const [error,setErrorMessage] = useState('')


 useEffect(() =>{
     handleShop()
 })


 const handleShop = async () => {
   await goToShop()
    .then(res=>{
       console.log(res)
   }).catch(err=>{
     console.log("error in shopping")
     setErrorMessage("error in shop page")
   })
 }



 return (
  <div>
    {/* Show error if user not authenticated */}
    {error && <Error error={error} />}

    {/* If user is not authenticated then, dont give access to the page */}
    {error ? "" : <p>Welcome  to shop page</p>}
  </div>
 )
}
