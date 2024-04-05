import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SpinnerLoader from "./SpinnerLoader";
import '../css/TeamStandings.css';

function TeamStandings() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();

    const [ selectedSeason, setSelectedSeason ] = useState('2023');
    const [ standingsData, setStandingsData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchConstructorStandings = async () => {
            if (selectedSeason) {
                try {
                    setIsLoading(true);
                    const response = await fetch(`http://localhost/F1-Hybrid-Data/f1-app/api/getConstructorStandings.php?season=${selectedSeason}`);

                    if (!response.ok) {
                        throw new Error('Unable to fetch Constructor Standings Data');
                    }

                    const data = await response.json();
                    setStandingsData(data.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
                } catch (error) {
                    console.log('Error fetching constructor standings data: ', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchConstructorStandings();
    }, [ selectedSeason ]);

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
        <div className="standings-container">
            <Navbar />
            <div className="standings-heading">
                <h3 className="page-heading">Constructors Championship {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="standings-select-container">
                <p>Choose a season from the list to view the constructor standings in that specific season:</p>
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
            <div className="standings-table-container">
            {isLoading ? <SpinnerLoader /> : null}
                {!isLoading && standingsData && (
                    <table className="table text-white constructors-table">
                        <thead className="constructors-table-head">
                            <tr>
                                <th className="text-center">Pos</th>
                                <th className="text-left">Team</th>
                                <th className="text-center">Points</th>
                                <th className="text-center">Wins</th>
                            </tr>
                        </thead>
                        <tbody className="constructors-table-body">
                            {standingsData.map((constructor, index) => (
                                <tr key={constructor.constructorId || index}>
                                    <td className="constructor-standing-position" style={{ background: getPositionColor(constructor.position) }}>{constructor.position}</td>
                                    <td className="constructor" style={{ background: `linear-gradient(200deg, ${getTeamColour(constructor.Constructor.name)}, rgb(17, 17, 17) 70%)` }}>{constructor.Constructor.name}</td>
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

export default TeamStandings;