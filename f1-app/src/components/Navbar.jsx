import React from 'react';
import '../css/Navbar.css';
import { NavLink } from 'react-router-dom';


function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-style">
      <div className="container-fluid">
        <h3 className="f1-title">HISTORICAL <span className="historical">F1</span></h3>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-end" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            <li>
                <NavLink to="/home" className="nav-link text-white active" aria-current="page" href="#">Home</NavLink>
            </li>
            <li>
                <NavLink to="/drivers" className="nav-link text-white" href="#">Drivers</NavLink>
            </li>
            <li>
                <NavLink to="/teams" className="nav-link text-white" href="#">Teams</NavLink>
            </li>
            <li className="nav-item dropdown">
                <NavLink to="/championships" className="nav-link dropdown-toggle text-white" href="#">Championships</NavLink>
            </li>
            <li>
                <NavLink to="/races" className="nav-link text-white" href="#">Races</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
