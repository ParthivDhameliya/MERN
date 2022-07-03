import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import { userContext } from "../App";

const Navbar = () => {
    const { state, dispatch } = useContext(userContext);
    const Menu = () => {
        if (state) {
            return (
                <>
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/About">AboutMe</NavLink>
                    <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    <NavLink className="nav-link" to="/Logout">Logout</NavLink>
                </>
            )
        } else {
            return (
                <>
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                    <NavLink className="nav-link" to="/Login">Login</NavLink>
                    <NavLink className="nav-link" to="/Signup">Signup</NavLink>
                </>
            )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-5">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt='Logo' />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto me-5">
                        <Menu />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;