import React, { useState } from 'react'
import {jwtDecode} from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);

  function doLogin(event){
    event.preventDefault();
    const loginRequstData = {email, password};
    fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body: JSON.stringify(loginRequstData)      
    })
    .then(resp => {
      // console.log(resp);
      if(resp.ok)      
          return resp.json();
      else
          setLoginError("Please provide valid credentials");
    })
      .then(data => {
        // data : {jwtToken:'.......'}
        console.log(data.jwtToken);
        // decoding the token, to capture subject
        const receivedToken = data.jwtToken;
        const decodedToken = jwtDecode(receivedToken);
        // console.log(decodedToken);
        const tokenSubject = decodedToken.sub;
        const userId = tokenSubject.split(',')[0];
        const userEmail = tokenSubject.split(',')[1];
        const userName = tokenSubject.split(',')[2];
        const userRoles = tokenSubject.split('[')[1];
        // preserve required data in localstorage/ context
        localStorage.setItem("token",receivedToken);
        localStorage.setItem("userId",userId);
        localStorage.setItem("userName",userName);
        localStorage.setItem("userEmail",userEmail);
        localStorage.setItem("userRoles",userRoles);
        // navigate to home page
        window.location.href="http://localhost:3000";
    })
  }
  return (
     <div className="row mt-2 ">
      <div className="col-md-3 border rounded shadow mx-auto">
        <form onSubmit={doLogin}>
          <h2>Login</h2>
          { loginError &&
            <div className='alert alert-danger' role='alert'>
              {loginError}
            </div>
          }
          <div className="mb-3">
            <label className="form-label">Email </label>
            <input type="email" className="form-control" 
            name='email'
            onChange={(event)=>setEmail(event.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
            name="password"
            onChange={(event)=>setPassword(event.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
