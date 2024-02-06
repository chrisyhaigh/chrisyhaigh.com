import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/TeamResults.css';

function TeamResults() {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [raceFlag, setRaceFlag] = useState([]);
    const [teamResultsData, setTeamResultsData] = useState([]);
    const [seasonFromParams, setSeasonFromParams] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const constructor = queryParams.get('constructor');

    useEffect(() => {
        const fetchConstructorResults = async () => {
            const seasonFromParams = queryParams.get('season');
            if (seasonFromParams && constructor) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getConstructorResults.php?season=${seasonFromParams}&constructor=${constructor}`);

                    if (!response.ok) {
                        throw new Error('Error fetching constructor results');
                    }

                    const data = await response.json();
                    console.log('Fetched Constructor Results:', data);

                    const races = data.MRData.RaceTable.Races;
                    const raceRound = races[0].raceName; 

                    console.log('Race:', raceRound);

                    const racesWithFlags = await Promise.all(
                        races.map(async (race) => {
                            let countryName = race.Circuit.Location.country;
                            if (countryName === 'UK') {
                                countryName = 'United Kingdom';
                            }
                            const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
                            const countryData = await countryResponse.json();
                            const flagUrl = countryData[0]?.flag?.png;
                            return flagUrl;
                        })
                    );

                    setRaceFlag(racesWithFlags);

                    const constructorResults = races.flatMap(race => {
                        const raceResults = race.Results.map(result => ({
                            ...result,
                            raceName: race.raceName,
                        }));
                        return raceResults;
                    });


                    const constructorName = `${constructorResults[0]?.Constructor?.name}`;
                    setSelectedTeam(constructorName);
                    setTeamResultsData(constructorResults);
                    setSeasonFromParams(seasonFromParams);
                } catch (error) {
                    console.error('Error Fetching Constructor results:', error);
                }
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
            <div className='team-results-heading-container'>
                <h3 className="team-results-heading">{selectedTeam} Results {seasonFromParams}</h3>
                <Link to="/teams">
                    <button className="button back-button">&larr;</button>
                </Link>
            </div>
            <div className="line"></div>
            <div className='team-results-table-container'>
                <table className='table text-white team-results-table'>
                    <thead className='team-results-table-head'>
                        <tr>
                            <th className="text-center">Race</th>
                            <th className="text-center">Driver1</th>
                            <th className="text-center">Pos</th>
                            <th className="text-center">Points</th>
                            <th className='text-center'>Driver2</th>
                            <th className="text-center">Pos</th>
                            <th className='text-center'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='team-resuts-table-body'>
                        {teamResultsData && teamResultsData.map((result, resultIndex) => 
                            <tr key={resultIndex}>
                                <td className='result-grid race'>{result.raceName} <img src={raceFlag[resultIndex]} ></img></td>
                                <td className='result-grid driver-1'>{result.givenName}{result.familyName}</td>
                                <td className='result-grid points'>{result.points}</td>
                                <td className='result-grid position' style={{ backgroundColor: getPositionColor(result.position) }}>{result.position}</td>
                                <td className='result-grid driver-2'>{result.givenName}{result.familyName}</td>
                                <td className='result-grid position' style={{ backgroundColor: getPositionColor(result.position) }}>{result.position}</td>
                                <td className='result-grid points'>{result.points}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeamResults;