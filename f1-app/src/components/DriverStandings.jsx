import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../css/DriverStandings.css';
import SpinnerLoader from "./SpinnerLoader";

function DriverStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('2024');
    const [ standingsData, setStandingsData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchDriverStandings = async () => {
            if (selectedSeason) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDriverStandings.php?season=${selectedSeason}`);

                    if (!response.ok) {
                        throw new Error('Unable to fetch driver standings');
                    }

                    const data = await response.json();
                    console.log('Driver Standings:', data);

                    setStandingsData(data.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                } catch (error) {
                    console.log('Unable to fetch driver standings', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchDriverStandings();
    }, [selectedSeason]);

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
            'Manor Marussia': '#6E0000',
            'Marussia': '#6E0000',
            'Lotus': '#FFB800',
            'Lotus F1': '#FFB800',
            'Toro Rosso': '#0005C1',
            'Sauber': '#0063FF'
        }

        return teamColor[teamName];
    }

    // Function to determine background color based on position
    
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
    };

    return (
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3 className="page-heading">Drivers Championship {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="standings-select-container">
                <p>Choose a season from the list to view the driver standings in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    {isLoading && <SpinnerLoader />}
                    <option value="">{selectedSeason}</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading ? <SpinnerLoader /> : null}
            <div className="driver-standings-table-container">
            {!isLoading && standingsData && (
                <table className="table drivers-table">
                    <thead className="driver-table-head">
                        <tr>
                            <th scope="col" className="text-center">Pos</th>
                            <th scope="col" colspan="2" className="text-left">Driver</th>
                            <th scope="col" className="text-left">Constructor</th>
                            <th scope="col" className="text-center">Points</th>
                            <th scope="col" className="text-center">Wins</th>
                        </tr>
                    </thead>
                    <tbody className="driver-table-body">
                        {standingsData.map((driver, index) => (
                            <tr scope="row" key={driver.Driver.driverId || index}>
                                <td className="driver-standing-position" style={{ backgroundColor: getPositionColor(driver.position) }}>{driver.position}</td>
                                <td colSpan="2">{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                <td className="constructor text-white" style={{ background: `linear-gradient(200deg, ${getTeamColour(driver.Constructors[0].name)}, rgb(17, 17, 17) 60%)` }}>{driver.Constructors[0].name}</td>
                                <td className="points text-center">{driver.points}</td>
                                <td className="wins text-center">{driver.wins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default DriverStandings;
