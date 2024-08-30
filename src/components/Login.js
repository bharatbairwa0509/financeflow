import {React , useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {



  const History = useNavigate();

const [credential , setCredential ] = useState({email :"" , password:""})

const onChange =(e)=>{
  setCredential({...credential , [e.target.name]: e.target.value})

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();





    
    const url = 'http://localhost:5000/api/auth/login';

    const headers = {
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        email :credential.email,
        password :credential.password
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
if (data.success) {
  localStorage.setItem('Token' , data.authtoken)
  History('/');
  props.showAlert("success logged in " , "success")
}
else{
props.showAlert("invalid credentials" , "danger")
}
        console.log(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
  }





 
  return (
    <div className='container bg-dark text-white'>
      <form onSubmit={handleSubmit}>
  <div className="  mb-3 bg-dark text-white">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control bg-dark text-white" id="email"  name = "email"  aria-describedby="emailHelp" onChange={onChange} value={credential.email}/>
    <div id="emailHelp" className="form-text bg-dark text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 bg-dark text-white">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control   bg-dark text-white" id="password" name='password' onChange={onChange} value={credential.password}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
