import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SpinnerLoader from './SpinnerLoader';
import '../css/DriverResults.css';
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

function DriverResults() {
    const [ selectedDriver, setSelectedDriver ] = useState('');
    const [ driverResultsData, setDriverResultsData ] = useState([]);
    const [ raceFlag, setRaceFlag ] = useState([]);
    const [ seasonFromParams, setSeasonFromParams ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const driver = queryParams.get('driver');

    useEffect(() => {
        const fetchDriverResults = async () => {
            const seasonFromParams = queryParams.get('season');
            if (seasonFromParams && driver) {
                try {
                    const response = await fetch(`http://localhost/chrisyhaigh.com/f1-app/api/getDriverResults.php?season=${seasonFromParams}&driver=${driver}`);
        
                    if (!response.ok) {
                        throw new Error('Error fetching Driver results');
                    }
        
                    const data = await response.json();
                    console.log('Fetched data:', data);
        
                    const races = data.data.MRData.RaceTable.Races;

                    const raceRound = races[0].round;
                    const raceName = races[0].raceName;

                    console.log('Race:', raceName, 'Round:', raceRound);

                    const racesWithFlags = await Promise.all(
                        races.map(async (race) => {
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
                    setIsLoading(false);

                    const driverResults = races.flatMap(race => {
                        const raceResults = race.Results.map(result => ({
                            ...result,
                            raceName: race.raceName,
                            round: race.round
                        }));
                        return raceResults;
                    });
                    

        
                    const driverName = `${driverResults[0]?.Driver?.givenName} ${driverResults[0]?.Driver?.familyName}`;

                    setSelectedDriver(driverName);
                    setDriverResultsData(driverResults);
                    setSeasonFromParams(seasonFromParams); // Update the seasonFromParams state
                } catch (error) {
                    console.error('Error fetching driver results:', error);
                }
            }
        };
    
        fetchDriverResults();
    }, [driver, queryParams]);

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
                return '';
        }
    };

    return (
        <div className='driver-results-container'>
            <Navbar />
            {isLoading && <SpinnerLoader />}
            <div className='driver-results-heading-container'>
                <h3 className='driver-results-heading'>{selectedDriver} Results {seasonFromParams}
                <img className="results-driver-image" src={getDriverImage(`${selectedDriver}`)} alt=""></img>
                </h3>
                <Link to="/drivers">
                    <button className="button back-button">&larr;</button>
                </Link>
            </div>
            <div className="line"></div>
            <div className="driver-results-table-container">
                <table className='table text-white driver-results-table'>
                    <thead className='driver-results-table-head'>
                        <tr>
                            <th className='text-center'>Round</th>
                            <th className='text-left'>Race</th>
                            <th className='text-center'>Grid</th>
                            <th className='text-center'>Pos</th>
                            <th className='text-center laps'>Laps</th>
                            <th className='text-center status'>Status</th>
                            <th className='text-center'>Points</th>
                        </tr>
                    </thead>
                    <tbody className='driver-results-table-body'>
                    {console.log('Driver results data:', driverResultsData)}
                        {driverResultsData && driverResultsData.map((result, resultIndex) => (
                            <tr key={resultIndex}>
                                <td className='result-grid text-center round'>{result.round}</td>
                                <td className='result-grid race text-left'>
                                    {result.raceName} <img src={raceFlag[resultIndex]} className="race-flag-result" alt="Flag" />
                                </td>
                                <td className='result-grid text-center grid'>{result.grid}</td>
                                <td className='result-grid text-center driver-race-position' style={{ backgroundColor: getPositionColor(result.position)} }>{result.position}</td>
                                <td className='result-grid text-center laps'>{result.laps}</td>
                                <td className='result-grid text-center status'>{result.status}</td>
                                <td className='result-grid text-center points'>{result.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DriverResults;
