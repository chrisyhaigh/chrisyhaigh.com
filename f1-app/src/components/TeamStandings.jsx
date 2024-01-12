import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import '../css/TeamStandings.css'

function TeamStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950}, (_, index) => 1950 + index).reverse();

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



    return (
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3>CONSTRUCTORS CHAMPIONSHIP</h3>
            </div>
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
               <table>
                    <thead className="constructors-table-head">
                        <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th>Points</th>
                            <th>Wins</th>
                        </tr>
                    </thead>
                    <tbody className="construtors-table-body">
                        {standingsData.map((constructor, index) => (
                         <tr key={constructor.constructorId || index}>
                            <td>{constructor.position}</td>
                            <td>{constructor.Constructor.name}</td>
                            <td>{constructor.points}</td>
                            <td>{constructor.wins}</td>
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