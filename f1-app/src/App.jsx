import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import LandingPage from './components/LandingPage.jsx'
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
                  <Navbar />
                  <Home />
                </>
              ) : (
                <LandingPage onEnterClick={handleEnterClick} />
              )
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

