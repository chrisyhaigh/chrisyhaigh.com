import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import '../css/DriverStandings.css'

function DriverStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950}, (_, index) => 1950 + index).reverse();

    return (
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3>DRIVERS CHAMPIONSHIP</h3>
            </div>
            <div className="standings-select-container">
                <p>Choose a season from the list to view the driver standings in that specific season:</p>
                <select>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default DriverStandings