// Navbar.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-link">Home</Link>
        </div>
        <div className="navbar-right">
          <NavLink to="/stackexchange" className="navbar-link" activeClassName="active-link">Stack Exchange</NavLink>
          <NavLink to="/airlinesqlinfo" className="navbar-link" activeClassName="active-link">Airline SQL</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
