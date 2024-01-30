import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/RaceResults.css';

function RaceResults() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014 }, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('2023');
    const [ selecteedRace, setSelectedRace ] = useState('');
    const [ raceData, setRaceData ] = useState(null);

    return (
        <div className="race-results-container">
            <Navbar />
            <div className="race-results-heading-container">
                <h3 className="race-results-heading">{selecteedRace} GRAND PRIX {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="select-container">
                <p>Choose a season from the select menu to display the race results for that year:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="race-results-table-container">
                <table className="table text-white race-results-table">
                    <thead className="race-results-table-head">
                        <tr>
                            <th className="text-center">Pos</th>
                            <th className="text-center">Driver</th>
                            <th className="text-center">Constructor</th>
                            <th className="text-center">Laps</th>
                            <th className="text-center">Grid</th>
                            <th className="text-center">Time</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Points</th>
                        </tr>
                    </thead>
                    <tbody className="race-results-table-body">
                        {/*insert data here*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RaceResults;