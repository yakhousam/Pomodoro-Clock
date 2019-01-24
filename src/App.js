import React, { Component } from "react";
import Break from "./components/Break";
import Clock from "./components/Clock";
import Session from "./components/Session";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
    this.state = {
      sessionTime: 25,
      breakTime: 5,
      time: 25 * 60,
      clockTime: "25:00",
      timerId: "",
      timerState: "Session",
      timerIsRunning: false
    };
  }
  secondToTimeFormater(second) {
    function formatDigit(num) {
      return num < 10 ? "0" + num : num;
    }
    if (second < 1) {
      return "00:00";
    }
    let s = second;
    let m = Math.floor(s / 60);
    s -= m * 60;
    return formatDigit(m) + ":" + formatDigit(s);
  }
  timer = () => {
    let time = this.state.time;
    let timerId = setTimeout(this.timer, 500);
    if (time >= 0) {
      this.setState({
        clockTime: this.secondToTimeFormater(time),
        timerId: timerId,
        time: time - 1
      });
    } else {
      this.audioRef.current.play();
      this.state.timerState === "Session"
        ? this.setState({
            timerState: "Break",
            time: this.state.breakTime * 60,
            timerId: timerId,
            clockTime: this.secondToTimeFormater(this.state.breakTime * 60)
          })
        : this.setState({
            timerState: "Session",
            time: this.state.sessionTime * 60,
            timerId: timerId,
            clockTime: this.secondToTimeFormater(this.state.sessionTime * 60)
          });
    }
  };
  handleClick = e => {
    const elementId = e.target.id;
    let sessionTime = this.state.sessionTime;
    let breakTime = this.state.breakTime;

    if (elementId === "start_stop") {
      if (this.state.timerIsRunning) {
        clearTimeout(this.state.timerId);
        this.setState({ timerIsRunning: false });
      } else {
        this.setState({ timerIsRunning: true });
        this.timer();
      }
      return;
    }
    if (elementId === "reset") {
      clearTimeout(this.state.timerId);
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
      this.setState({
        sessionTime: 25,
        breakTime: 5,
        time: 25 * 60,
        clockTime: "25:00",
        timerId: "",
        timerState: "Session",
        timerIsRunning: false
      });
      return;
    }
    if (!this.state.timerIsRunning) {
      switch (elementId) {
        case "session-increment":
          sessionTime = sessionTime < 60 ? sessionTime + 1 : 60;
          break;
        case "session-decrement":
          sessionTime = sessionTime > 1 ? sessionTime - 1 : 1;
          break;
        case "break-increment":
          breakTime = breakTime < 60 ? breakTime + 1 : 60;
          break;
        case "break-decrement":
          breakTime = breakTime > 1 ? breakTime - 1 : 1;
          break;
        default:
          break;
      }
      this.setState({
        sessionTime,
        breakTime,
        time: sessionTime * 60,
        clockTime: this.secondToTimeFormater(sessionTime * 60)
      });
    }
  };
  render() {
    return (
      <React.Fragment>
      <section className="container">
        <Break breakTime={this.state.breakTime} onClick={this.handleClick} />
        <Session
          sessionTime={this.state.sessionTime}
          onClick={this.handleClick}
        />
        <Clock
          time={this.state.clockTime}
          timerState={this.state.timerState}
          onClick={this.handleClick}
        />
        <audio
          id="beep"
          ref={this.audioRef}
          src="https://dl.dropboxusercontent.com/s/54zjmbw2rwpcgir/beep.mp3"
        />
      </section>
      <div className="about">Coded and designed by <a href="https://github.com/yakhousam/Promodoro-Clock">yakhousam</a></div>
      </React.Fragment>
    );
  }
}

export default App;
