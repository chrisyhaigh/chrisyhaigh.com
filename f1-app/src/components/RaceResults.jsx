import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import '../css/RaceResults.css';

function RaceResults() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014 }, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ selectedRace, setSelectedRace ] = useState('');
    const [ raceData, setRaceData ] = useState(null);
    const [ raceFlag, setRaceFlag ] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const round = queryParams.get('round');

    useEffect(() => {
        const fetchRaceResults = async () => {
            const seasonFromParams = queryParams.get('season');
            if (seasonFromParams && round) {
                setSelectedSeason(seasonFromParams);

                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getRaceResults.php?season=${seasonFromParams}&round=${round}`);
                    if (!response.ok) {
                        throw new Error('Error fetching Race Results');
                    }
                    const data = await response.json();
                    console.log('Race Result:', data);

                    const racesWithFlags = await Promise.all(
                        data.data.MRData.RaceTable.Races.map(async (race) => {
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

                    const raceName = data.data.MRData.RaceTable.Races[0]?.raceName;
                    setSelectedRace(raceName);

                    setRaceData(data.data.MRData.RaceTable.Races);
                } catch (error) {
                    console.log('Error fetching race results: ', error);
                }
            }
        };
        fetchRaceResults();
    }, [round, queryParams]);

    {/*insert getRaceColours function*/}

    const getTeamColour = (teamName) => {

        const teamColor = {
            'Mercedes': '#00A19B',
            'Red Bull': '#121F45',
            'Ferrari': '#EF1A2D',
            'Aston Martin': '#00594F',
            'Williams': 'blue',
            'Alfa Romeo': '#972738', 
            'McLaren': '#FF8000',
            'Alpine F1 Team': '#02192B',
            'Haas F1 Team': '#6C0000',
            'AlphaTauri': '#20394C',
            'Force India': 'green',
            'Racing Point': '#F363B9',
            'Renault': 'black',
            'Caterham': '#005030',
            'Marussia': '#6E0000',
            'Manor Marussia': '#6E0000',
            'Lotus F1': '#FFB800',
            'Toro Rosso': '#0005C1',
            'Sauber': '#0063FF'
        }

        return teamColor[teamName];
    }

    const getPositionColor = (position) => {
        switch (position) {
            case '1':
                return '#AE8625';
            case '2':
                return '#848484';
            case '3':
                return '#804A00';
            default:
                return 'red'; 
        }
    }

    return (
        <div className="race-results-container">
            <Navbar />
            <div className="race-results-heading-container">
                <h3 className="race-results-heading">{selectedRace} {selectedSeason}</h3>
                {raceFlag && raceFlag.map((flagUrl, index) => (
                    <img key={index} src={flagUrl} alt="Country Flag" className="race-flag" />
                ))}
            </div>
            <div className="line"></div>
            <div className="race-results-table-container">
                <table className="table text-white race-results-table">
                    <thead className="race-results-table-head">
                        <tr>
                            <th className="text-center">Pos</th>
                            <th className="text-center">Driver</th>
                            <th className="text-center">Constructor</th>
                            <th className="text-center">Laps</th>
                            <th className="text-center">Grid</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Points</th>
                        </tr>
                    </thead>
                    <tbody className="race-results-table-body">
                        {raceData && raceData.map((race, raceIndex) => (
                            race.Results.map((result, resultIndex) => (
                                <tr key={`${raceIndex}-${resultIndex}`}>
                                    <td className="race-grid position text-center" style={{ backgroundColor: getPositionColor(result.position) }}>{result.position}</td>
                                    <td className="race-grid driver text-left">{result.Driver.givenName} {result.Driver.familyName}</td>
                                    <td className="race-grid constructor text-left" style={{ background:  `linear-gradient(200deg, ${getTeamColour(result.Constructor.name)}, rgb(17, 17, 17) 70%)` }}>{result.Constructor.name}</td>
                                    <td className="race-grid laps text-center">{result.laps}</td>
                                    <td className="race-grid grid text-center">{result.grid}</td>
                                    <td className="race-grid status text-center">{result.status}</td>
                                    <td className="race-grid points text-center">{result.points}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RaceResults;
