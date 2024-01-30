import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import '../css/TeamResults.css'

function TeamResults() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('2023');
    const [ selectedTeam, setSelectedTeam ] = useState('');
    const [ teamResultsData, setTeamResultsData ] = useState(null);

    return (
        <div className="team-results-container">
            <Navbar />
            <div className='team-results-heading-container'>
                <h3 className="team-results-heading">{selectedTeam} TEAM RESULTS {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="select-container">
                <p>Choose a season from the select menu to display the teams race results for that year:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className='team-results-table-container'>
                <table className='table text-white team-results-table'>
                    <thead className='team-results-table-head'>
                        <tr>
                            <th className="text-center">Race</th>
                            <th className="text-center">Drivers</th>
                            <th className="text-center">Pos</th>
                            <th className='text-center'>Laps</th>
                            <th className="text-center">Grid</th>
                            <th className='text-center'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='team-resuts-table-body'>
                        {/* insert data here */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeamResults;