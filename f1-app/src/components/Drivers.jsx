import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import '../css/Drivers.css';

function Drivers() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950}, (_, index) => 1950 + index).reverse();
 
    const [selectedSeason, setSelectedSeason] = useState('');
    const [driverData, setDriversData] = useState(null);


    useEffect(() => {
        const fetchDrivers = async () => {

            if (selectedSeason) {
                try {
                    const response = await fetch(`/php/getDrivers.php?season=${selectedSeason}`);
                    if (!response.ok) {
                        throw new Error('Unable to fetch data');
                    }
                    const data = await response.json();
                    setDriversData(data.data.MRData.DriverTable.Drivers);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching drivers data: ', Error);
                }
            }
        };

        fetchDrivers();
    }, [selectedSeason]);

    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3>DRIVER HISTORY</h3>
            </div>
            <div className="drivers-select-container">
                <p>Choose a season from the list to view the drivers who participated in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="drivers-profile-container">
                {driverData && driverData.map(driver => (
                    <div key={driver.driverId}>
                        <p>{`${driver.givenName} ${driver.familyName}`}</p>
                        <p>{`Date of Birth: ${driver.dateOfBirth}`}</p>
                        <p>{`Nationality: ${driver.nationality}`}</p>
                        <p>{`Wikipedia: ${driver.url} `}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Drivers;
