import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/Races.css'


function Races() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();

  const [ selectedSeason, setSelectedSeason ] = useState('')
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
          setRaceData(data.data.MRData.RaceTable.Race)

        } catch (error) {
          console.log('Error fetching race data: ', error)
        }
      }
    }
    fetchRaceData();
  }, [ selectedSeason ]);

  return (
    <div>
      <Navbar />
      <div className="races-container">
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
        {raceData && raceData.map((race) => (
          <div key={race.round} className="race-box-container">
            <div className="race-img-container">
              <img className="race-img-container" alt=""></img>
            </div>
            <div className="race-details">
                <p>Round: {race.round}</p>
                <p>Name: {race.raceName}</p>
                <p>Date: {race.date}</p>
                <p>Location: {race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                <p>Circuit: {race.Circuit.circuitName}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Races