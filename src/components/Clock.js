import React from "react";

function Clock(props) {
  return (
    <React.Fragment>
      <div className="clock">
        <div id="timer-label" className="label">{props.timerState}</div>
        <div id="time-left" className="timer">{props.time}</div>
      </div>

      <div className="btns-clock">
        <button id="start_stop" onClick={props.onClick}>⏯</button>
        <button id="reset" onClick={props.onClick}>◼</button>
      </div>
    </React.Fragment>
  );
}
export default Clock;