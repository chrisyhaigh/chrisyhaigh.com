import React from 'react'
import '../css/LandingPage.css'

const LandingPage = ({ onEnterClick }) => {
    return (
        <div className='Landing-container'> 
            <div className='image-container'>
            </div>
            <div className='button-container'>
                <h3 className="f1-title">HISTORICAL <span className="historical">F1</span></h3>
                <button onClick={onEnterClick} className="enter-button">ENTER</button>
            </div>
        </div>
    )
}

export default LandingPage
