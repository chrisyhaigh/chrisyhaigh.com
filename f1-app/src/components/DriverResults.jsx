import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import '../css/DriverResults.css'

function DriverResults() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014 }, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('2023')
    const [ selectedDriver, setSelectedDriver ] = useState('')
    const [ driverResultsData, setDriverResultsData ] = useState(null);

    return (
        <div className='driver-results-container'>
            <Navbar />
            <div className='driver-results-heading-container'>
                <h3 className='driver-results-heading'>{selectedDriver} DRIVER RESULTS {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="select-container">
                <p>Choose a season from the select menu to display the drivers race results for that year:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
            </div>
            <div className="driver-results-table-container">
                <table className='table text-white driver-results-table'>
                    <thead className='driver-results-table-head'>
                        <tr>
                            <th className='text-center'>Race</th>
                            <th className='text-center'>Pos</th>
                            <th className='text-center'>Grid</th>
                            <th className='text-center'>Laps</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='driver-results-table-body'>
                        {/* insert data here */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DriverResults;