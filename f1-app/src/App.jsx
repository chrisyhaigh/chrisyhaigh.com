import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import LandingPage from './components/LandingPage.jsx'
import Drivers from './components/Drivers.jsx'
import Teams from './components/Teams.jsx'
import DriverStandings from './components/DriverStandings.jsx'
import TeamStandings from './components/TeamStandings.jsx'
import Races from './components/Races.jsx'
import DriverResults from './components/DriverResults.jsx';
import TeamResults from './components/TeamResults.jsx'
import RaceResults from './components/RaceResults.jsx'

import './index.css'

const App = () => {
    const [enteredSite, setEnteredSite] = useState(false)

    const handleEnterClick = () => {
      setEnteredSite(true);
    }

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
              enteredSite ? ( 
                <>
                  <Home />
                </>
              ) : (
                <LandingPage onEnterClick={handleEnterClick} />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/driverstandings" element={<DriverStandings />} />
          <Route path="/teamstandings" element={<TeamStandings />} />
          <Route path="/races" element={<Races />} />
          <Route path="/driverresults" element={<DriverResults />} />
          <Route path="/teamresults" element={<TeamResults />} />
          <Route path="/raceresults" element={<RaceResults />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

