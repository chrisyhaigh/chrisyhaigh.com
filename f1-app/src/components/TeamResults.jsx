import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import SpinnerLoader from './SpinnerLoader';
import '../css/TeamResults.css';

function TeamResults() {
    const [ selectedTeam, setSelectedTeam ] = useState('');
    const [ teamResultsData, setTeamResultsData ] = useState([]);
    const [ raceFlag, setRaceFlag ] = useState([]);
    const [ seasonFromParams, setSeasonFromParams ] = useState('');


    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const constructor = decodeURIComponent(queryParams.get('constructor'));
    const [ isLoading, setIsLoading ] = useState(true); 
    
    useEffect(() => {
        const fetchConstructorResults = async () => {
            try {
                const seasonFromParams = queryParams.get('season');
                const response = await fetch(
                    `http://chrisyhaigh.com/f1-app/api/getConstructorResults.php?season=${seasonFromParams}&constructor=${constructor}`
                );

                if (!response.ok) {
                    throw new Error('Error fetching constructor results');
                }

                const data = await response.json();
                const races = data.data.MRData.RaceTable.Races;

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

                const constructorResults = races.flatMap(race => {
                    const raceResults = race.Results.map(result => ({
                        ...result,
                        raceName: race.raceName,
                    }));
                    return raceResults;
                });

                console.log('Constructor Results:', constructorResults);

                const constructorName = `${constructorResults[0]?.Constructor?.name}`;
                console.log('Constructor Name:', constructorName);

                setRaceFlag(racesWithFlags);
                setTeamResultsData(races);
                setSelectedTeam(constructorName);
                setSeasonFromParams(seasonFromParams);
            } catch (error) {
                console.error('Error Fetching Constructor results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConstructorResults();
    }, [constructor, queryParams]);


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
        <div className="team-results-container">
            <Navbar />
            {isLoading && <SpinnerLoader />}
            <div className="team-results-heading-container">
                <h3 className="team-results-heading">
                    {selectedTeam} Results {seasonFromParams}
                </h3>
                <Link to={`/teams?season=${seasonFromParams}`}>
                    <button className="button back-button">&larr;</button>
                </Link>
            </div>
            <div className="line"></div>
            <div className="team-results-table-container">
                <table className="table text-white team-results-table">
                    <thead className="team-results-table-head">
                        <tr>
                            <th colSpan="1" className="text-left">Race</th>
                            <th colSpan="2" className="text-left">Driver (1)</th>
                            <th colSpan="1" className='text-center grid-position'>Grid</th>
                            <th className="text-center driver-position">Pos</th>
                            <th className="text-center team-points">Points</th>
                            <th colSpan="2" className="text-left">Driver (2)</th>
                            <th colSpan="1" className='text-center grid-position'>Grid</th>
                            <th className="text-center driver-position">Pos</th>
                            <th className="text-center team-points">Points</th>
                        </tr>
                    </thead>
                    <tbody className="team-results-table-body">
                        {teamResultsData.map((race, index) => (
                            <tr key={race.round}>
                                <td colSpan="1" className="result-grid race-list text-left"><img src={raceFlag[index]} className="race-flag-result" alt="race-flag"></img></td>
                                {race.Results.map((result) => (
                                    <React.Fragment key={result.Driver.driverId}>
                                        <td colSpan="2" className="result-grid text-left driver">{`${result.Driver.givenName} ${result.Driver.familyName}`}</td>
                                        <td className="result-grid text-center grid-position">{`${result.grid}`}</td>
                                        <td className="result-grid text-center driver-position" style={{ backgroundColor: getPositionColor(result.position) }}>{result.position}</td>
                                        <td className="result-grid text-center team-points points">{result.points}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeamResults;
