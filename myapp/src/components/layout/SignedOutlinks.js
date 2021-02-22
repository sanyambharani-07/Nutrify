import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutlinks = () => {
  return (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/signup' style={{ color: "white" }}>
          SignUp
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/' style={{ color: "white" }}>
          LogIn
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutlinks;