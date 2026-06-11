import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

  const { register, handleSubmit , formState:{errors}} = useForm();
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  function doRegister(formData){
    console.log(formData);
    if(formData.password === formData.confirmPassword){
      setPasswordError(null);
        // send api call, to register user
        fetch('http://localhost:8080/users/register',{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(formData)
        })
        .then(resp => {
          console.log("FIRST THEN",resp);  
          if(resp.ok)  
               navigate("/login")      
          return resp.json()
        })
        .then(data => {
          console.log("SECOND THEN",data) 
          if(data.status===400){
            setPasswordError(data.detail);
          }
        })
    }
    else{
      setPasswordError("Password and Confirm Password must be same")
    }
  }

  return (
    <div className="row mt-2 ">
      <div className="col-md-3 p-2 border rounded shadow mx-auto">
        <form onSubmit={handleSubmit(doRegister)}>
          <h2>Register</h2>
          {
            passwordError &&
            <div className="alert alert-danger" role="alert">
              {passwordError}
            </div>
          }
          <div className="mb-3">
            <label className="form-label">Username </label>
            <input type="text" className="form-control"
            {...register('username',
              {                
                required:'Username is required',
                // minLength:{value:3, message:'Username must contain  min 3 chars'}                
              }
            )} />
            {
            errors.username && 
            <div className="alert alert-danger">
             {errors?.username?.message}
            </div>
            }
          </div>
          <div className="mb-3">
            <label className="form-label">Email </label>
            <input type="email" className="form-control"
            {...register('email',
              {                
                required:'Email is required',
                // email is not supported, so using pattern
                 pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email'
                }           
              }
            )} />
             {
            errors.email && 
            <div className="alert alert-danger">
             {errors?.email?.message}
            </div>
            }
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
            {...register('password',
              {
                required:"Password is required",
                minLength:{value:6, message:"Password must contain minimum 6 characters"},
                maxLength:{value:12, message:"Password must contain maximum 12 characters"},
                 pattern: {
                    value: /^[a-zA-Z0-9@#_]+$/,
                    message: 'Password can contain only alphabets, digits and special symbols @#_'
                  }
              }
            )}/>
             {
            errors.password && 
            <div className="alert alert-danger">
             {errors?.password?.message}
            </div>
            }
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" 
            {...register('confirmPassword',{
                required:"Confirm Password is required"
            })}/>
             {
            errors.confirmPassword && 
            <div className="alert alert-danger">
             {errors?.confirmPassword?.message}
            </div>
            }
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input type="text" className="form-control"
              {...register('mobile',
                {
                required:"Mobile is required",
                minLength:{value:10, message:"Mobile must contain exactly 10 digits"},
                maxLength:{value:10, message:"Mobile must contain exactly 10 digits"},
                
              }
              )} />
               {
            errors.mobile && 
            <div className="alert alert-danger">
             {errors?.mobile?.message}
            </div>
            }
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <span>Already a user? Click <Link to={'/login'}>here</Link>  to login</span>
        </form>
      </div>
    </div>
  );
}

export default Register;
