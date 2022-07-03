import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/download.png';

const About = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate("/login", { replace: true });
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div className='container'>
      <form method='GET' className='about-con p-lg-3'>
        <div className='row'>
          <div className='col-md-4 px-lg-3'>
            <img src={image} alt='profile picture' className='pp' />
          </div>
          <div className='col-md-6'>
            <p>{userData.name}</p>
            <p className='work'>{userData.work}</p>
            <p>Rating : 1/10</p>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#timeline">Timeline</a>
              </li>
            </ul>
          </div>
          <div className='col-md-2'>
            <input type='submit' id='addMore' value='Edit Profile' />
          </div>
        </div>
        <div className='row lower'>
          <div className='col-md-4 p-lg-5'>
            <p>WORK LINK</p>
            <a href='https://www.instagram.com/' className='work_link' target="_blank">Instagram</a><br />
            <a href='https://www.facebook.com/' className='work_link' target="_blank">Facebook</a><br />
            <a href='https://www.upwork.com/' className='work_link' target="_blank">Upwork</a><br />
            <a href='https://in.linkedin.com/' className='work_link' target="_blank">Linkedin</a><br />
            <a href='https://www.youtube.com/' className='work_link' target="_blank">Youtube</a><br />
          </div>
          <div className='col-md-8'>
            <div className='row d-flex'>
              <div className='col-md-6'>
                <label>Userid</label>
              </div>
              <div className='col-md-6 work'>
                <p>77866565456</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Name</label>
              </div>
              <div className='col-md-6 work'>
                <p>{userData.name}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Email</label>
              </div>
              <div className='col-md-6 work'>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Phonenumber</label>
              </div>
              <div className='col-md-6 work'>
                <p>{userData.phone}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Profession</label>
              </div>
              <div className='col-md-6 work'>
                <p>{userData.work}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default About;