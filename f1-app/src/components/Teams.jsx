import React from "react";
import Navbar from "./Navbar";
import '../css/Teams.css'

function Teams() {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 19450 }, (_, index) => 1950 + index).reverse();

    return (
        <div className="teams-container">
            <Navbar />
            <div className="teams-heading">
                <h3>TEAM HISTORY</h3>
            </div>
            <div className="teams-select-container">
                <p>Choose a season from the list to view the teams who participated in that specific season:</p>
                <select>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))} 
                </select>
            </div>
            <div className="teams-profile-container">
                {/* Team details in here */}
            </div>
        </div>
    )
}

export default Teams