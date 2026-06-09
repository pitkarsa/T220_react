import React from 'react'

export default function Login() {
  return (
     <div className="row mt-2 ">
      <div className="col-md-3 border rounded shadow mx-auto">
        <form>
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
