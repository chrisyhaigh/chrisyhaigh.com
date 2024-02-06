import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/DriverResults.css';

function DriverResults() {
    const [selectedDriver, setSelectedDriver] = useState('');
    const [driverResultsData, setDriverResultsData] = useState([]);
    const [raceFlag, setRaceFlag] = useState([]);
    const [seasonFromParams, setSeasonFromParams] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const driver = queryParams.get('driver');

    useEffect(() => {
        const fetchDriverResults = async () => {
            const seasonFromParams = queryParams.get('season');
            if (seasonFromParams && driver) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDriverResults.php?season=${seasonFromParams}&driver=${driver}`);
        
                    if (!response.ok) {
                        throw new Error('Error fetching Driver results');
                    }
        
                    const data = await response.json();
                    console.log('Fetched data:', data);
        
                    const races = data.data.MRData.RaceTable.Races;

                    // Extract race round and race name from the first race
                    const raceRound = races[0].round;
                    const raceName = races[0].raceName;

                    console.log('Race:', raceName, 'Round:', raceRound);

                    const racesWithFlags = await Promise.all(
                        races.map(async (race) => {
                            let countryName = race.Circuit.Location.country;
                            if (countryName === 'UK') {
                                countryName = 'United Kingdom';
                            }
                            const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
                            const countryData = await countryResponse.json();
                            const flagUrl = countryData[0]?.flags?.png;
                            return flagUrl;
                        })
                    );
        
                    setRaceFlag(racesWithFlags);
        
                    const driverResults = races.flatMap(race => {
                        const raceResults = race.Results.map(result => ({
                            ...result,
                            raceName: race.raceName,
                            round: race.round
                        }));
                        return raceResults;
                    });
                    

        
                    const driverName = `${driverResults[0]?.Driver?.givenName} ${driverResults[0]?.Driver?.familyName}`;
                    setSelectedDriver(driverName);
                    setDriverResultsData(driverResults);
                    setSeasonFromParams(seasonFromParams); // Update the seasonFromParams state
                } catch (error) {
                    console.error('Error fetching driver results:', error);
                }
            }
        };
    
        fetchDriverResults();
    }, [driver, queryParams]);

    const getPositionColor = (position) => {
        switch (position) {
            case '1':
                return '#AE8625';
            case '2':
                return '#848484';
            case '3':
                return '#804A00';
            case '4':
                return '#5DBB63';
            case '5':
                return '#5DBB63';
            case '6':
                return '#5DBB63';
            case '7':
                return '#5DBB63';
            case '8':
                return '#5DBB63';
            case '9':
                return '#5DBB63';
            case '10':
                return '#5DBB63';
        }
    }

    return (
        <div className='driver-results-container'>
            <Navbar />
            <div className='driver-results-heading-container'>
                <h3 className='driver-results-heading'>{selectedDriver} Results {seasonFromParams}</h3>
                <Link to="/drivers">
                    <button className="button back-button">&larr;</button>
                </Link>
            </div>
            <div className="line"></div>
            <div className="driver-results-table-container">
                <table className='table text-white driver-results-table'>
                    <thead className='driver-results-table-head'>
                        <tr>
                            <th className='text-center'>Round</th>
                            <th className='text-left'>Race</th>
                            <th className='text-center'>Pos</th>
                            <th className='text-center'>Grid</th>
                            <th className='text-center'>Laps</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='driver-results-table-body'>
                    {console.log('Driver results data:', driverResultsData)}
                        {driverResultsData && driverResultsData.map((result, resultIndex) => (
                            <tr key={resultIndex}>
                                <td className='result-grid text-center round'>{result.round}</td>
                                <td className='result-grid race text-left'>
                                    {result.raceName} <img src={raceFlag[resultIndex]} className="race-flag-result" alt="Flag" />
                                </td>
                                <td className='result-grid text-center position' style={{ backgroundColor: getPositionColor(result.position)} }>{result.position}</td>
                                <td className='result-grid text-center grid'>{result.grid}</td>
                                <td className='result-grid text-center laps'>{result.laps}</td>
                                <td className='result-grid text-center status'>{result.status}</td>
                                <td className='result-grid text-center points'>{result.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DriverResults;
