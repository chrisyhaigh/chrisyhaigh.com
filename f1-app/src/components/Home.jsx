import React from "react";
import '../css/Home.css'
import Helmet from '../images/helmetpng.png'
import Lotus from '../images/lotus.png'
import Trophy from '../images/trophypng.png'
import CheqFlag from '../images/cheqflag.png'
import TeamTrophy from '../images/constructortrophy.png'
import { Link } from 'react-router-dom'
import Navbar from "./Navbar";



function Home() {
    return (
        <div>
            <Navbar />
            <div className="main-container">
                <div className="home-container">
                    <Link to='/drivers' className="component-container">
                        <div className="comp-img-container">
                            <img src={Helmet} alt="F1 Helmet" width="180"></img>
                        </div>
                        <h3 className="text-center">Drivers</h3>
                    </Link>
                    <Link to='/teams' className="component-container">
                        <div className="comp-img-container">
                            <img src={Lotus} alt="Lotus F1 Car" width='200'></img>
                        </div>
                        <h3 className="text-center">Teams</h3>
                    </Link>
                    <Link to="/driverstandings" className="component-container">
                        <div className="comp-img-container">
                            <img src={Trophy} alt="Driver Trophy" width='150'></img>
                        </div>
                        <h3 className="text-center">Drivers Championship</h3>
                    </Link>
                    <Link to="/teamstandings" className="component-container">
                        <div className="comp-img-container">
                            <img src={TeamTrophy} alt="Constructor Trophy" width='150'></img>
                        </div>
                        <h3 className="text-center">Constructors Championship</h3>
                    </Link>
                    <Link to='/races' className="component-container">
                        <div className="comp-img-container">
                            <img src={CheqFlag} alt="Chequered Flag" width="180"></img>
                        </div>
                        <h3 className="text-center">Races</h3>
                    </Link>      
                </div>
            </div>
        </div>   
    )
}

export default Home