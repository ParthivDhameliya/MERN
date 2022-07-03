import React, { useEffect, useState } from 'react';

const Home = () => {

  const [userData, setUserData] = useState({ name: "" });
  const [show, setShow] = useState(false);
  const callHomePage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      setUserData(data);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callHomePage();
  }, []);
  return (
    <div className='home-page'>
      <div className='home-div text-center'>
        <p className='home-heading'>Welcome</p>
        <h1 className='home-text'>{userData.name}</h1>
        <p className='home-text'>{show ? "Happy to see you back" : "Welcome to developer's community"}</p>
      </div>
    </div>
  )
}

export default Home;