import React from 'react'
import { useState } from 'react';
import '../css/LandingPage.css'
import SpinnerLoader from './SpinnerLoader'

const LandingPage = ({ onEnterClick }) => {
    const [ isLoading, setIsLoading ] = useState(true);


    return (
        <div className='Landing-container'> 
            <div className='image-container'>
            </div>
            <div className='button-container'>
                <div className="logo-container">
                    <h3 className="f1-title">F <span className="one">1</span></h3>
                    <h6 className="data">DATA</h6>
                </div>
                <p className="sub-title text-white">Drivers | Teams | Races</p>
                <button onClick={onEnterClick} className="enter-button">ENTER</button>
            </div>
        </div>
    )
}

export default LandingPage
