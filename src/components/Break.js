import React from "react";

function Break(props) {
  return (
    <div className="break">
      <div id="break-label" className="label">Break Length</div>
      <div className="btn-container">
        <div id="break-length" className="length-clock">{props.breakTime}</div>
        <div className="btns">
          <button id="break-increment" onClick={props.onClick}>⌃</button>
          <button id="break-decrement" onClick={props.onClick}>⌄</button>
        </div>
      </div>
    </div>
  );
}

export default Break;
