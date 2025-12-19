import './block.css'
import './event-block.css'
import { useState } from 'react';
import AddIcon from "./../assets/addIcon.svg"

function EventBlock() {

  const [showPopup, setShowPopup] = useState(false);

  return (
      <div className="block" id="eventBlock">
        <h2>Events</h2>
        <div className="eventWrapper">
        <div className="eventContainer"> 
          <button 
            onClick={() => setShowPopup(true)}
            className="eventButton"
            id="addButton">
              <img src={AddIcon} className="addIcon" />
          </button>
        </div>
        </div>
        {showPopup && (
        <div className="addPopupOverlay" onClick={() => setShowPopup(false)}>
          <div className="addPopup" onClick={(e => e.stopPropagation())}>
            <h2> Add event </h2>
            <div className="nameForm">
              <p> Name </p>
              <input className="nameInput"></input>
            </div>
            <p> Description </p>
            <input className="descInput"></input>
            <div className="selectionButtons">
              <button className="selectionButton" onClick={() => setShowPopup(false)}>Add</button>
              <button className="selectionButton" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </div>
        )}
      </div>
  )
}

export default EventBlock
