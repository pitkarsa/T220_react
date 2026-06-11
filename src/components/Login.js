import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('sumit@gmail.com');
  const [password, setPassword] = useState('sumit@1234');

  function doLogin(event){
    event.preventDefault();
    const loginRequstData = {email, password};
    fetch(`http://localhost:8080/users/login`,{
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body: JSON.stringify(loginRequstData)      
    })
    .then(resp => resp.json())
      .then(data => console.log(data))
  }
  return (
     <div className="row mt-2 ">
      <div className="col-md-3 border rounded shadow mx-auto">
        <form onSubmit={doLogin}>
          <h2>Login</h2>
          <div className="mb-3">
            <label className="form-label">Email </label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
