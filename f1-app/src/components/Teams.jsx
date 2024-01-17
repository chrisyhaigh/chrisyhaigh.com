import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/Teams.css'

function Teams() {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();

    const [selectedSeason, setSelectedSeason] = useState('2023');
    const [constructorData, setConstructorData] = useState(null);
 
    useEffect(() => {
        const fetchConstructorData = async () => {
            if (selectedSeason) 
              try {
                const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getConstructors.php?season=${selectedSeason}`);

                if (!response.ok) {
                    throw error('Unable to fetch season data');
                }

                const data = await response.json();
                setConstructorData(data.data.MRData.ConstructorTable.Constructors);
                console.log(data);
            } catch (error) {
                console.log('No Data could be found', error)
            }
        }

        fetchConstructorData();
    }, [selectedSeason]);

    return (
        <div className="team-container">
            <Navbar />
            <div className="team-heading">
                <h3>TEAM HISTORY</h3>
            </div>
            <div className="team-select-container">
                <p>Choose a season from the list to view the teams who participated in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="team-profile-container">
                {constructorData && constructorData.map(constructor => (
                    <div key={constructor.constructorId} className="team-profile">
                        <div className="team-image-container">
                            <img src="" alt=""></img>
                        </div>
                        <div className="team-details">
                            <p className="team-name">{`${constructor.name}`}</p>
                            <p className="team-info">{`Nationality: ${constructor.nationality}`}</p>
                            <p className="team-info">{`Wikipedia: ${constructor.url}`}</p>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    )
}

export default Teams