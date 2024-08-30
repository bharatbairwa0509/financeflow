import { useState } from "react"
import React  from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const History = useNavigate();
const [credential , setCredential ] = useState({email :"" , password:"" , name :"" , cpassword:""})
const handsignup = async (e)=>{
  e.preventDefault();

  
  const url = 'http://localhost:5000/api/auth/createuser';

  const headers = {
      'Content-Type': 'application/json'
  };

  const body = JSON.stringify({
      email :credential.email,
      password :credential.password ,
      name :credential.name
  });

  const requestOptions = {
      method: 'POST',
      headers: headers,
      body: body
  };

  try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

localStorage.setItem('Token' , data.authtoken)
History('/');
props.showAlert("succesfully created account" , "success")

  } catch (error) {
      console.error('Error fetching data:', error);
  }
  
}





const onChange =(e)=>{
  setCredential({...credential , [e.target.name]: e.target.value})

  }
  return (
    <div className="container">
     <form onSubmit={handsignup}>
     <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name </label>
    <input type="text" className="form-control bg-dark text-white" id="name" name = "name" aria-describedby="emailHelp" value={credential.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control bg-dark text-white" id="email" name='email' aria-describedby="emailHelp" value={credential.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text bg-dark text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control bg-dark text-white" id="password" name='password'  value={credential.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"> confirm Password</label>
    <input type="password"  className="form-control bg-dark text-white" id="cpassword" name='cpassword'value={credential.cpassword} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
