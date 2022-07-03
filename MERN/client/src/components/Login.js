import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { Email, Lock } from '@material-ui/icons';
import loginimg from '../images/loginimg.jfif';
import { userContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(userContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    if (!email || !password) {
      window.alert("Invalid credintials");
    } else {
      dispatch({ type: "USER", payload: true })
      window.alert("Login successfull");
      navigate("/", { replace: true });
    }
  }

  return (
    <section className='login p-5'>
      <div className='container p-lg-5 main'>
        <div className='row g-3 mx-lg-auto img'>
          <div className='img'>
            <img src={loginimg} className='signupimg' />
            <NavLink to='/signup' className='to-signup p-lg-5 mx-2'> Create an account </NavLink>
          </div>
        </div>
        <div className='row g-3 m-lg-auto form'>
          <h2 className='login-heading text-black-50 m-2'>Login Form</h2>
          <form method='POST' className='login-form'>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              /><span></span>
              <label htmlFor="mail"><Email /> Your Email </label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" className="form-control" id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password"><Lock /> Your Password</label>
            </div>
            <div className='button mt-4'>
              <input type='submit' id='submit' name='submit' value='Submit' className='btn btn-primary'
                onClick={loginUser}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login;