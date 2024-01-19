import React from 'react'
import '../css/LandingPage.css'

const LandingPage = ({ onEnterClick }) => {
    return (
        <div className='Landing-container'> 
            <div className='image-container'>
            </div>
            <div className='button-container'>
                <h3 className="f1-title">F <span className="one">1</span><span className="historical">DATA</span></h3>
                <p className="sub-title text-white">Drivers | Teams | Races</p>
                <button onClick={onEnterClick} className="enter-button">ENTER</button>
            </div>
        </div>
    )
}

export default LandingPage
