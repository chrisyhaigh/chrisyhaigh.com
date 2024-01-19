import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import '../css/TeamStandings.css'

function TeamStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('');
    const [ standingsData, setStandingsData ] = useState(null);

    useEffect(() => {
        const fetchConstructorStandings = async () => {
            if (selectedSeason) {
                try {const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getConstructorStandings.php?season=${selectedSeason}`)

                if (!response.ok) {
                    throw new error('Unable to fetch Constructor Standings Data')
                }

                const data = await response.json();
                console.log('Constructor Data:', data)

                setStandingsData(data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)

                } catch (error) {
                    console.log('Error fetching constructor standings data: ', error)
                }
            }
        };

        fetchConstructorStandings()
    }, [ selectedSeason ]);

    const getTeamColour = (teamName) => {

        const teamColor = {
            'Mercedes': '#00A19B',
            'Red Bull': '#121F45',
            'Ferrari': '#EF1A2D',
            'Aston Martin': '#00594F',
            'Williams': 'blue',
            'Alfa Romeo': '#241F21', 
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

    return (
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3 className="page-heading">CONSTRUCTORS CHAMPIONSHIP {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="standings-select-container">
            <p>Choose a season from the list to view the constructor standings in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="standings-table-container">
               { standingsData && ( 
               <table className="table text-white constructors-table">
                    <thead className="constructors-table-head">
                        <tr>
                            <th className="text-center">Pos</th>
                            <th className="text-center">Team</th>
                            <th className="text-center">Points</th>
                            <th className="text-center">Wins</th>
                        </tr>
                    </thead>
                    <tbody className="construtors-table-body">
                        {standingsData.map((constructor, index) => (
                         <tr key={constructor.constructorId || index}>
                            <td className="position" style={{ backgroundColor: 'red'}}>{constructor.position}</td>
                            <td className="constructor" style={{backgroundColor: getTeamColour(constructor.Constructor.name)}}>{constructor.Constructor.name}</td>
                            <td className="points text-center">{constructor.points}</td>
                            <td className="wins text-center">{constructor.wins}</td>
                         </tr>   
                        ))}
                    </tbody>
                </table>
               )}
            </div>
        </div>
               
    );
}

export default TeamStandings