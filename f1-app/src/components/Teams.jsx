import React from "react";
import Navbar from "./Navbar";
import '../css/Teams.css'

function Teams() {
    return (
        <div className="teams-container">
            <Navbar />
            <div className="teams-heading">
                <h3>TEAM HISTORY</h3>
            </div>
            <div className="teams-select-container">
                <p>Choose a season from the list to view the teams who participated in that specific season:</p>
                <select>
                    <option>Season</option>
                </select>
            </div>
        </div>
    )
}

export default Teams