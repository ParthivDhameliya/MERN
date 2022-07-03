import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Person, Email, Phone, Work, Lock } from '@material-ui/icons/';
import signupimg from '../images/signupimg.png';

const Signup = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: "", nameError: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword, nameError } = user; 
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword, nameError
      })
    })

    const data = await res.json();
    if (!name || !email || !phone || !work || !password || !cpassword) {
      window.alert("Registration unsuccessfull");
    } else {
      window.alert("Registration successfull");
      navigate("/login", { replace: true });
    }
  }

  return (
    <section className='signup p-5'>
      <div className='container p-lg-5 main'>
        <div className='row g-3 ps-5 form'>
          <h2 className='signup-heading text-black-50 m-2'>Signup Form</h2>
          <form method='POST' className='signup-form'>
            <div className="form-floating mb-3">
              <input type="text" name='name' className="form-control" id="name"
                value={user.name} onChange={handleInputs} />
              <label htmlFor="name"><Person /> Your Name </label>
            </div><span name='nameError'>{user.nameError}</span>
            <div className="form-floating mb-3">
              <input type="email" name='email' className="form-control" id="email"
                value={user.email} onChange={handleInputs} />
              <label htmlFor="mail"><Email /> Your Email </label>
            </div>
            <div className="form-floating mb-3">
              <input type="tel" name='phone' className="form-control" id="phone"
                value={user.phone} onChange={handleInputs} />
              <label htmlFor="phone"><Phone /> Your Phonenumber </label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name='work' className="form-control" id="work"
                value={user.work} onChange={handleInputs} />
              <label htmlFor="work"><Work /> Your Work </label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" name='password' className="form-control" id="password"
                value={user.password} onChange={handleInputs} />
              <label htmlFor="password"><Lock /> Your Password</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" name='cpassword' className="form-control" id="cpassword"
                value={user.cpassword} onChange={handleInputs} />
              <label htmlFor="cpassword"><Lock /> Confirm Your Password</label>
            </div>
            <div className='button mt-4'>
              <input type='submit' id='submit' name='submit' value='Submit' className='btn btn-primary'
                onClick={postData} />
            </div>
          </form>
        </div>
        <div className='row g-3 m-lg-auto'>
          <div className='img'>
            <img src={signupimg} className='signupimg' />
          </div>
          <NavLink to="/login" className='to-signup login-in-signup'> Login if already registered </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Signup;