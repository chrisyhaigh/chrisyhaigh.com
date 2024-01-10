import React, { useState } from "react";
import Navbar from "./Navbar";
import '../css/Championships.css';

function DriverStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTab, setSelectedTab] = useState('driver-tab');

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    }

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    }

    return (
        <div className="championship-container">
            <Navbar />
            <div className="championship-heading">
                <h3>CHAMPIONSHIPS</h3>
            </div>
            <div className="select-container">
                <p>Choose a season from the list to view the driver standings from each season:</p>
                <select value={selectedYear} onChange={handleYearChange}>
                    <option value=''>Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {selectedYear && (
                <div>
                    <ul className="nav nav-fill nav-tabs" id="championshipTabs">
                        <li className="nav-item">
                            <a className={`nav-link ${selectedTab === 'driver-tab' ? 'active' : ''}`} onClick={() => handleTabClick('driver-tab')} href="#drivers">DRIVERS</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedTab === 'constructor-tab' ? 'active' : ''}`} onClick={() => handleTabClick('constructor-tab')} href="#constructors">CONSTRUCTORS</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className={`tab-pane fade ${selectedTab === 'driver-tab' ? 'show active' : ''}`} id="drivers">
                            <h4 className="standings-heading">{`Drivers Championship standings for ${selectedYear}`}</h4>
                            {/* Driver Data */ }
                        </div>

                        <div className={`tab-pane fade ${selectedTab === 'constructor-tab' ? 'show active' : ''}`} id="constructors">
                            <h4 className="standings-heading">{`Constructors Championship standings for ${selectedYear}`}</h4>
                            {/* Constructor Data */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Championships;
