import React from "react";
import Navbar from "./Navbar";
import '../css/Races.css'


function Races() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, index) => 1950 + index).reverse();


  return (
    <div>
      <Navbar />
      <div className="races-container">
        <div className="race-history-heading">
          <h3>RACE HISTORY</h3>
        </div>
        <div class="select-container">
          <p>Choose a season from the select menu to display the race history for that particular year:</p>
          <select>
            <option value="">Season</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}


export default Races