import React from 'react';
import '../css/Navbar.css';

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
                <a className="nav-link text-white active" aria-current="page" href="#">Home</a>
            </li>
            <li>
                <a className="nav-link text-white" href="#">Drivers</a>
            </li>
            <li>
                <a className="nav-link text-white" href="#">Teams</a>
            </li>
            <li>
                <a className="nav-link text-white" href="#">Championships</a>
            </li>
            <li>
                <a className="nav-link text-white" href="#">Races</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
