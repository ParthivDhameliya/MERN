import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from "./components/About";
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Errorpage from "./components/Errorpage";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "../src/Reducer/useReducer";

export const userContext = createContext();
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <userContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </userContext.Provider>
      </>
    );
  }

export default App;
