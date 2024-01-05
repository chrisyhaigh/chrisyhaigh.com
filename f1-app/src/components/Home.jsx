import React from "react";
import '../css/Home.css'
import Helmet from '../images/helmetpng.png'
import Lotus from '../images/lotus.png'
import Trophy from '../images/trophypng.png'
import CheqFlag from '../images/cheqflag.png'
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
                            <img src={Helmet} alt="F1 Helmet" width="160"></img>
                        </div>
                        <h3 className="text-center">Drivers</h3>
                    </Link>
                    <Link to='/teams' className="component-container">
                        <div className="comp-img-container">
                            <img src={Lotus} alt="Lotus F1 Car" width='180'></img>
                        </div>
                        <h3 className="text-center">Teams</h3>
                    </Link>
                    <Link to="/championships" className="component-container">
                        <div className="comp-img-container">
                            <img src={Trophy} alt="Lewis Hamilton popping champagne" width='140'></img>
                        </div>
                        <h3 className="text-center">Championships</h3>
                    </Link>
                    <Link to='/races' className="component-container">
                        <div className="comp-img-container">
                            <img src={CheqFlag} alt="Chequered Flag" width="140"></img>
                        </div>
                        <h3 className="text-center">Races</h3>
                    </Link>      
                </div>
            </div>
        </div>   
    )
}

export default Home