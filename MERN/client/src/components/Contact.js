import React, { useEffect, useState } from 'react';
import { PhoneAndroidOutlined, EmailOutlined, LocationOnOutlined, Message, Person, Email, Phone } from '@material-ui/icons/';

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "", email: "", phone: "", message: ""
  });
  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callContactPage();
  }, []); 

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  }

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();
    if (!name || !email || !phone || !message) {
      window.alert("Message not sent");
    } else {
      window.alert("Message sent successfully");
      setUserData({ ...userData, message: "" })
    }
  }

  return (
    <div className='contact'>
      <div className='container-fluid '>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 info-box'>
            {/* Phonenumber */}
            <div className='d-flex justify-content-start align-items-center box'>
              <div className='text-primary me-4'>
                <PhoneAndroidOutlined />
              </div>
              <div className='info'>
                <div className='contact-title'>
                  Phonenumber
                </div>
                <div className='contact-info'>
                  +1 111 222 3344
                </div>
              </div>
            </div>
            {/* email*/}
            <div className='d-flex justify-content-start align-items-center box'>
              <div className='text-primary me-4'>
                <EmailOutlined />
              </div>
              <div className='info'>
                <div className='contact-title'>
                  Email
                </div>
                <div className='contact-info'>
                  contact@gmail.com
                </div>
              </div>
            </div>
            {/* location */}
            <div className='d-flex justify-content-start align-items-center box'>
              <div className='text-primary me-4'>
                <LocationOnOutlined />
              </div>
              <div className='info'>
                <div className='contact-title'>
                  Location
                </div>
                <div className='contact-info'>
                  Surat, India.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact form */}
      <div className='contact-form'>
        <div className='container my-5 contact-container justify-content-center main'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact-form-container'>
                <div className='contact-form-title my-5 justify-content-center'>
                  Get in touch
                </div>
                <form method='POST' id='contact-form'>
                  <div className='contact-detail'>
                    <div className="form-floating mb-4 contact-input">
                      <input type="text" name='name' className="form-control" id="name" value={userData.name}
                        onChange={handleInputs} />
                      <label htmlFor="name"><Person /> Your Name </label>
                    </div>
                    <div className="form-floating mb-4 contact-input">
                      <input type="email" name='email' className="form-control" id="email" value={userData.email}
                        onChange={handleInputs} />
                      <label htmlFor="mail"><Email /> Your Email </label>
                    </div>
                    <div className="form-floating mb-4 contact-input">
                      <input type="tel" name='phone' className="form-control" id="phone" value={userData.phone}
                        onChange={handleInputs} />
                      <label htmlFor="phone"><Phone /> Your Phone </label>
                    </div>
                  </div>
                  <div className='contact-message'>
                    <div className="form-floating mb-4 contact-input">
                      <input type="text" name='message' className="form-control" id="message" value={userData.message}
                        onChange={handleInputs} />
                      <label htmlFor="message"><Message /> Your Message </label>
                    </div>
                    <div className='button mt-5 text-center'>
                      <input type='submit' id='submit' name='submit' value='Submit' className='btn btn-primary'
                        onClick={contactForm} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;