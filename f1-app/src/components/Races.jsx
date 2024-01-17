import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/Races.css'


function Races() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();

  const [ selectedSeason, setSelectedSeason ] = useState('2023')
  const [ raceData, setRaceData ] = useState(null);

  useEffect(() => {
    const fetchRaceData = async () => {
      if (selectedSeason) {
        try {
          const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getRaces.php?season=${selectedSeason}`)
          
          if (!response.ok) {
            throw new Error('Error fetching race data')
          }

          const data = await response.json();
          console.log('Race History Data:', data)
          setRaceData(data.data.MRData.RaceTable)

        } catch (error) {
          console.log('Error fetching race data: ', error)
        }
      }
    }
    fetchRaceData();
  }, [ selectedSeason ]);

  return (
    <div>
      <div className="races-container">
        <Navbar />
        <div className="race-history-heading">
          <h3>RACE HISTORY</h3>
        </div>
        <div className="select-container">
          <p>Choose a season from the select menu to display the race history for that particular year:</p>
          <select onChange={(e) => setSelectedSeason(e.target.value)}>
            <option value="">Season</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="race-list-container"> 
        {raceData?.Races && raceData.Races.map((race) => (
          <div key={race.round} className="race-box-container">
            <div className="race-img-container">
              <img className="race-img-container" alt=""></img>
            </div>
            <div className="race-details">
                <p className="race-name">{race.raceName}</p>
                <p className="race-info">{race.date}, Round: {race.round}</p>
                <p className="race-info">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                <p className="race-info">{race.Circuit.circuitName}</p>
                <p className="race-info">Race Winner:</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Races