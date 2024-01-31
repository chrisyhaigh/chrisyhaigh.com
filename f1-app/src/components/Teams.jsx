import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TeamResults from "./TeamResults";
import { Link } from 'react-router-dom';
import '../css/Teams.css';
import Mercedes from '../team-logos/Mercedes.png'
import RedBull from '../team-logos/Red Bull.png'
import Ferrari from '../team-logos/Ferrari.png'
import Williams from '../team-logos/Williams.png'
import AstonMartin from '../team-logos/Aston Martin.png'
import Lotus from '../team-logos/Lotus F1.png'
import McLaren from '../team-logos/McLaren.png'
import Haas from '../team-logos/Haas F1 Team.png'
import AlphaTauri from '../team-logos/AlphaTauri.png'
import AlfaRomeo from '../team-logos/Alfa Romeo.png'
import Alpine from '../team-logos/Alpine F1 Team.png'
import Caterham from '../team-logos/Caterham.png'
import ForceIndia from '../team-logos/Force India.png'
import Marussia from '../team-logos/Marussia.png'
import RacingPoint from '../team-logos/Racing Point.png'
import Renault from '../team-logos/Renault.png'
import Sauber from '../team-logos/Sauber.png'
import ToroRosso from '../team-logos/Toro Rosso.png'


function Teams() {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();

    const [selectedSeason, setSelectedSeason] = useState('2023');
    const [constructorData, setConstructorData] = useState(null);
 
    useEffect(() => {
        const fetchConstructorData = async () => {
            if (selectedSeason) 
              try {
                const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getConstructors.php?season=${selectedSeason}`);

                if (!response.ok) {
                    throw Error('Unable to fetch season data');
                }

                const data = await response.json();
                setConstructorData(data.data.MRData.ConstructorTable.Constructors);
                console.log(data);
            } catch (error) {
                console.log('No Data could be found', error)
            }
        }

        fetchConstructorData();
    }, [selectedSeason]);

    const getTeamLogos = (teamName) => {
        switch (teamName) {
            case 'Mercedes':
                return Mercedes;
            case 'Red Bull':
                return RedBull;
            case 'Ferrari':
                return Ferrari;
            case 'Williams':
                return Williams;
            case 'Aston Martin':
                return AstonMartin;
            case 'Lotus F1':
                return Lotus;
            case 'McLaren':
                return McLaren;
            case 'Haas F1 Team':
                return Haas;
            case 'AlphaTauri':
                return AlphaTauri;
            case 'Alfa Romeo':
                return AlfaRomeo;
            case 'Alpine F1 Team':
                return Alpine;
            case 'Caterham':
                return Caterham;
            case 'Force India':
                return ForceIndia;
            case 'Marussia':
                return Marussia;
            case 'Manor Marussia':
                return Marussia
            case 'Racing Point':
                return RacingPoint;
            case 'Renault':
                return Renault;
            case 'Sauber':
                return Sauber;
            case 'Toro Rosso':
                return ToroRosso;

            default:
                return null;
        }
    };


    return (
        <div className="team-container">
            <Navbar />
            <div className="team-heading">
                <h3 className="page-heading">Teams {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="team-select-container">
                <p>Choose a season from the list to view the teams who participated in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="team-profile-container">
                {constructorData && constructorData.map(constructor => (
                    <Link to="/teamresults" key={constructor.constructorId}>
                        <div className="team-profile">
                            <div className="team-image-container">
                                <img src={getTeamLogos(constructor.name)} width='180' alt=""></img>
                            </div>
                            <div className="team-details">
                            </div>
                        </div>
                    </Link>    
                ))}
            </div>
        </div>
    )
}

export default Teams