import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/DriverStandings.css';

function DriverStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();

    const [selectedSeason, setSelectedSeason] = useState('');
    const [standingsData, setStandingsData] = useState(null);

    useEffect(() => {
        const fetchDriverStandings = async () => {
            if (selectedSeason) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDriverStandings.php?season=${selectedSeason}`);

                    if (!response.ok) {
                        throw new Error('Unable to fetch driver standings');
                    }

                    const data = await response.json();
                    console.log('Driver Standings:', data);

                    setStandingsData(data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

                } catch (error) {
                    console.log('Unable to fetch driver standings', error);
                }
            }
        };

        fetchDriverStandings();
    }, [selectedSeason]);

    return (
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3>DRIVERS CHAMPIONSHIP</h3>
            </div>
            <div className="standings-select-container">
                <p>Choose a season from the list to view the driver standings in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="standings-table-container">
                {standingsData && (
                        <table className="drivers-table">
                            <thead className="driver-table-head">
                                <tr>
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Constructor</th>
                                    <th>Points</th>
                                    <th>Wins</th>
                                </tr>
                            </thead>
                            <tbody className="drivers-table-body">
                                {standingsData.map((driver, index) => (
                                <tr key={driver.Driver.driverId || index}>
                                    <td>{driver.position}</td>
                                    <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                    <td>{driver.wins}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                )}
            </div>
        </div>
    );
}

export default DriverStandings;
