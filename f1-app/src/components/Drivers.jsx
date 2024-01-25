import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/Drivers.css';
import Helmet from '../images/helmetpng.png'

function Drivers() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();
 
    const [selectedSeason, setSelectedSeason] = useState('2023');
    const [driverData, setDriversData] = useState(null);


    useEffect(() => {
        const fetchDrivers = async () => {
            if (selectedSeason) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDrivers.php?season=${selectedSeason}`);

                    if (!response.ok) {
                        throw new Error('Unable to fetch data');
                    }

                    const data = await response.json();
                    setDriversData(data.data.MRData.DriverTable.Drivers);
                    
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching drivers data: ', error);
                }
            }
        };

        fetchDrivers();
    }, [selectedSeason]);

    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3 className="page-heading">DRIVER LIST {selectedSeason}</h3>
            </div>
            <div className="line"></div>
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
                    <div key={driver.driverId} className="driver-profile">
                        <div className="driver-image-container">
                            <img className="driver-image" src={Helmet} width="80" alt=""></img>
                        </div>
                        <div className="driver-details">
                            <p className="driver-name">{`${driver.givenName} ${driver.familyName}`}</p>
                            <p className="driver-info">{`Date of Birth: ${driver.dateOfBirth}`}</p>
                            <p className="driver-info">{`Nationality: ${driver.nationality}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Drivers;
