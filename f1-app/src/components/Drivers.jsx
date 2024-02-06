import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DriverResults from "./DriverResults";
import { Link } from 'react-router-dom';
import '../css/Drivers.css';
import Helmet from '../images/helmetpng.png'
import Aitken from '../driver-images/aitken.png'
import Albon from '../driver-images/albon.png'
import Alonso from '../driver-images/alonso.png'
import Bianchi from '../driver-images/bianchi.png'
import Bottas from '../driver-images/bottas.png'
import Button from '../driver-images/button.png'
import Chilton from '../driver-images/chilton.png'
import DeVries from '../driver-images/de vries.png'
import DiResta from '../driver-images/di-resta.png'
import Ericsson from '../driver-images/ericsson.png'
import Fittipaldi from '../driver-images/fittipaldi.png'
import Gasly from '../driver-images/gasly.png'
import Giovinazzi from '../driver-images/giovanazzi.png'
import Grosjean from '../driver-images/grosjean.png'
import Gutierrez from '../driver-images/gutierrez.png'
import Hamilton from '../driver-images/hamilton.png'
import Hartley from '../driver-images/hartley.png'
import Haryanto from '../driver-images/haryanto.png'
import Hulkenburg from '../driver-images/hulkenburg.png'
import Kobayashi from '../driver-images/kobayashi.png'
import Kubica from '../driver-images/kubica.png'
import Kyvat from '../driver-images/kyvat.png'
import Latifi from '../driver-images/latifi.png'
import Lawson from '../driver-images/lawson.png'
import Leclerc from '../driver-images/leclerc.png'
import Lotterer from '../driver-images/lotterer.png'
import Magnussen from '../driver-images/magnussen.png'
import Maldonaldo from '../driver-images/maldonado.png'
import Massa from '../driver-images/massa.png'
import Mazepin from '../driver-images/mazepin.png'
import Merhi from '../driver-images/merhi.png'
import Nasr from '../driver-images/nasr.png'
import Norris from '../driver-images/norris.png'
import Ocon from '../driver-images/ocon.png'
import Palmer from '../driver-images/palmer.png'
import Perez from '../driver-images/perez.png'
import Piastri from '../driver-images/piastri.png'
import Raikkonen from '../driver-images/raikkonen.png'
import Ricciardo from '../driver-images/ricciardo.png'
import Rosberg from '../driver-images/rosberg.png'
import Rossi from '../driver-images/rossi.png'
import Russell from '../driver-images/russell.png'
import Sainz from '../driver-images/sainz.png'
import Sargeant from '../driver-images/sargeant.png'
import Schumacher from '../driver-images/schumacher.png'
import Sirotkin from '../driver-images/sirotkin.png'
import Stevens from '../driver-images/stevens.png'
import Stroll from '../driver-images/stroll.png'
import Sutil from '../driver-images/sutil.png'
import Tsunoda from '../driver-images/tsunoda.png'
import Vandoorne from '../driver-images/vandoorne.png'
import Vergne from '../driver-images/vergne.png'
import Verstappen from '../driver-images/verstappen.png'
import Vettel from '../driver-images/vettel.png'
import Wehrlein from '../driver-images/wehrlein.png'
import Zhou from '../driver-images/zhou.png'


function Drivers() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014}, (_, index) => 2014 + index).reverse();
 
    const [selectedSeason, setSelectedSeason] = useState('2023');
    const [driverData, setDriversData] = useState(null);


    useEffect(() => {
        const fetchDrivers = async () => {
            if (selectedSeason) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDrivers.php?season=${selectedSeason}`);

                    if (!response.ok) {
                        throw new Error('Unable to fetch data');
                    }

                    const data = await response.json();
                    setDriversData(data.data.MRData.DriverTable.Drivers);
                    
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching drivers data: ', error);
                }
            }
        };

        fetchDrivers();
    }, [selectedSeason]);

    const getDriverImage = (driver) => {
        switch (driver) {
            case 'Jack Aitken':
                return Aitken;
            case 'Alexander Albon':
                return Albon;
            case 'Fernando Alonso':
                return Alonso;
            case 'Jules Bianchi':
                return Helmet;
            case 'Valtteri Bottas':
                return Bottas;
            case 'Jenson Button':
                return Button;
            case 'Max Chilton':
                return Chilton;
            case 'Nyck de Vries':
                return DeVries;
            case 'Paul di Resta':
                return DiResta;
            case 'Marcus Ericsson':
                return Ericsson;
            case 'Pietro Fittipaldi':
                return Fittipaldi;
            case 'Pierre Gasly':
                return Gasly;
            case 'Antonio Giovinazzi':
                return Giovinazzi;
            case 'Romain Grosjean':
                return Grosjean;
            case 'Esteban Gutiérrez':
                return Gutierrez;
            case 'Lewis Hamilton':
                return Hamilton;
            case 'Brendon Hartley':
                return Hartley;
            case 'Rio Haryanto':
                return Haryanto;
            case 'Nico Hülkenberg':
                return Hulkenburg;
            case 'Kamui Kobayashi':
                return Kobayashi;
            case 'Robert Kubica':
                return Kubica;
            case 'Daniil Kvyat':
                return Kyvat;
            case 'Nicholas Latifi':
                return Latifi;
            case 'Liam Lawson':
                return Lawson;
            case 'Charles Leclerc':
                return Leclerc;
            case 'André Lotterer':
                return Lotterer;
            case 'Kevin Magnussen':
                return Magnussen;
            case 'Pastor Maldonado':
                return Maldonaldo;
            case 'Felipe Massa':
                return Massa;
            case 'Nikita Mazepin':
                return Mazepin;
            case 'Roberto Merhi':
                return Merhi;
            case 'Felipe Nasr':
                return Nasr;
            case 'Lando Norris':
                return Norris;
            case 'Esteban Ocon':
                return Ocon;
            case 'Jolyon Palmer':
                return Palmer;
            case 'Sergio Pérez':
                return Perez;
            case 'Oscar Piastri':
                return Piastri;
            case 'Kimi Räikkönen':
                return Raikkonen;
            case 'Daniel Ricciardo':
                return Ricciardo;
            case 'Nico Rosberg':
                return Rosberg;
            case 'Alexander Rossi':
                return Rossi;
            case 'George Russell':
                return Russell;
            case 'Carlos Sainz':
                return Sainz;
            case 'Logan Sargeant':
                return Sargeant;
            case 'Mick Schumacher':
                return Schumacher;
            case 'Sergey Sirotkin':
                return Sirotkin;
            case 'Will Stevens':
                return Stevens;
            case 'Lance Stroll':
                return Stroll;
            case 'Adrian Sutil':
                return Helmet;
            case 'Yuki Tsunoda':
                return Tsunoda;
            case 'Stoffel Vandoorne':
                return Vandoorne;
            case 'Jean-Éric Vergne':
                return Vergne;
            case 'Max Verstappen':
                return Verstappen;
            case 'Sebastian Vettel':
                return Vettel;
            case 'Pascal Wehrlein':
                return Wehrlein;
            case 'Guanyu Zhou':
                return Zhou;
            default:
                return Helmet;
        }
    };

    
    return (
        <div className="drivers-container">
            <Navbar />
            <div className="drivers-heading">
                <h3 className="page-heading">Drivers {selectedSeason}</h3>
            </div>
            <div className="line"></div>
            <div className="drivers-select-container">
                <p>Choose a season from the list to view the drivers who participated in that specific season:</p>
                <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="">Season</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="drivers-profile-container">
                {driverData && driverData.map(driver => (
                    <Link to={`/driverresults?season=${selectedSeason}&driver=${driver.familyName}`} 
                          key={driver.driverId} 
                          className="driver-link">
                        <div className="driver-profile">
                            <div className="driver-image-container">
                                <img className="driver-image" src={getDriverImage(`${driver.givenName} ${driver.familyName}`)} width="120" alt=""></img>
                            </div>
                            <div className="driver-line"></div>
                            <div className="driver-details">
                                <p className="driver-name">{`${driver.givenName} ${driver.familyName}`}</p>
                                <p className="driver-info">{`DOB: ${driver.dateOfBirth}`}</p>
                                <p className="driver-info">{`Nationality: ${driver.nationality}`}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
    
}

export default Drivers;
