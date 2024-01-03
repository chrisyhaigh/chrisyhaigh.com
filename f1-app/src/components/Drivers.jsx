import React from "react";
import Navbar from "./Navbar";
import '../css/Drivers.css'

function Drivers() {
    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3>DRIVER HISTORY</h3>
            </div>
            <div className="drivers-select-container">
                <p>Choose a season from the list to view the drivers who participated in that specific season:</p>
                <select>
                    <option>Season</option>
                </select>
            </div>
        </div>
    )
}

export default Drivers