import React from "react";
import Navbar from "./Navbar";
import '../css/Drivers.css';

function Drivers() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950}, (_, index) => 1950 + index).reverse();

    {/* Creating the select dropdown menu by populating with the years */}

    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3>DRIVER HISTORY</h3>
            </div>
            <div className="drivers-select-container">
                <p>Choose a season from the list to view the drivers who participated in that specific season:</p>
                <select>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="drivers-profile-container">
                {/* Drivers details in here */}
            </div>
        </div>
    );
}

export default Drivers;
