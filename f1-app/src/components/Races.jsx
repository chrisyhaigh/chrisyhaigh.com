import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom'
import '../css/Races.css';
import SpinnerLoader from "./SpinnerLoader";

function Races() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, index) => 2014 + index).reverse();

  const [ selectedSeason, setSelectedSeason ] = useState('2023');
  const [ raceData, setRaceData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchRaceData = async () => {
      if (selectedSeason) {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost/F1-Hybrid-Data/f1-app/api/getRaces.php?season=${selectedSeason}`);

          if (!response.ok) {
            throw new Error('Error fetching race data');
          }

          const data = await response.json();
          console.log('Race History Data:', data);

          // Fetch flags for each country
          const racesWithFlags = await Promise.all(
            data.data.MRData.RaceTable.Races.map(async (race) => {
              let countryName = race.Circuit.Location.country;

              if (countryName === 'UK') {
                countryName = 'United Kingdom';
              }

              const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
              const countryData = await countryResponse.json();
              const flagUrl = countryData[0]?.flags?.png;


              return { ...race, flagUrl };
            })
          );

          setRaceData(racesWithFlags);

        } catch (error) {
          console.log('Error fetching race data: ', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRaceData();
  }, [selectedSeason]);

  return (
    <div>
      <div className="races-container">
        <Navbar />
        <div className="race-history-heading">
          <h3 className="page-heading">Races {selectedSeason}</h3>
        </div>
        <div className="line"></div>
        <div className="select-container">
          <p className="select-font">Choose a season from the select menu to display the race history for that particular year:</p>
          <select onChange={(e) => setSelectedSeason(e.target.value)}>
            <option value="">{selectedSeason}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {isLoading && <SpinnerLoader />}
        <div className="race-list-container">
          {raceData?.map((race) => (
            <Link to={`/raceresults?season=${selectedSeason}&round=${race.round}`} 
                  key={race.round} 
                  className="race-link">
              <div className="race-box-container">
                <div className="round-container">
                  <p className="race-round">Round {race.round}</p>
                </div>
                <div className="race-img-container">
                  {/* Display the flag using the flag URL */}
                  <img className="race-img" src={race.flagUrl} alt={`Flag of ${race.Circuit.Location.country}`} />
                </div>
                <div className="race-details">
                  <p className="race-name">{race.raceName}</p>
                  <p className="race-info">{race.date}</p>
                  <p className="race-info">{race.Circuit.circuitName}</p>
                  <p className="race-info">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Races;
