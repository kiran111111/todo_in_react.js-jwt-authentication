// localStorage.setItem({
//  login:true,
//  token : token
// })


function login(){
 fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
       'Content-Type': 'application/json',
       // 'Content-Type': 'application/x-www-form-urlencoded',
  }
 })
 .then(function(response) {
   return response.json();
 })
 .then(function(myJson) {
   console.log(myJson);
   console.log("yes")
  });
}

login()