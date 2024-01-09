import React from "react";
import { useState } from 'react';
import Navbar from "./Navbar";
import '../css/TeamStandings.css'

function TeamStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950}, (_, index) => 1950 + index).reverse();

    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3>CONSTRUCTORS CHAMPIONSHIP</h3>
            </div>
            <div className="drivers-select-container">
            <p>Choose a season from the list to view the constructor standings in that specific season:</p>
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

export default TeamStandings