import React from "react";

function Session(props) {
  return (
    <div className="session">
      <div id="session-label" className="label">Session Length</div>
      <div className="btn-container">
        <div id="session-length" className="length-clock">{props.sessionTime}</div>
        <div className="btns">
          <button id="session-increment" onClick={props.onClick}>⌃</button>
          <button id="session-decrement" onClick={props.onClick}>⌄</button>
        </div>
      </div>
    </div>
  );
}

export default Session;
