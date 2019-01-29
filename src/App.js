import React, { Component } from "react";
import Break from "./components/Break";
import Clock from "./components/Clock";
import Session from "./components/Session";
import Beep from "./beep.mp3"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
    this.state = {
      sessionTime: 25,
      breakTime: 5,
      timeSeconds: 25 * 60,
      clockTime: "25:00",
      timerId: "",
      timerState: "Session",
      timerIsRunning: false
    };
  }
  secondsToMinuteFormat(seconds) {
    if (seconds <= 0) {
      return "00:00";
    }
    const formatDigit = num => (num < 10 ? "0" + num : num);
    let minute = Math.floor(seconds / 60);
    return formatDigit(minute) + ":" + formatDigit(seconds - minute * 60);
  }
  timer = () => {
    let timerId = setTimeout(this.timer, 1000);
    if (this.state.timeSeconds >= 0) {
      this.setState({
        clockTime: this.secondsToMinuteFormat(this.state.timeSeconds),
        timerId: timerId,
        timeSeconds: this.state.timeSeconds - 1
      });
    } else {
      this.audioRef.current.play();
      this.state.timerState === "Session"
        ? this.setState({
            timerState: "Break",
            timeSeconds: this.state.breakTime * 60,
            timerId: timerId,
            clockTime: this.secondsToMinuteFormat(this.state.breakTime * 60)
          })
        : this.setState({
            timerState: "Session",
            timeSeconds: this.state.sessionTime * 60,
            timerId: timerId,
            clockTime: this.secondsToMinuteFormat(this.state.sessionTime * 60)
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
        timeSeconds: 25 * 60,
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
        timeSeconds: sessionTime * 60,
        clockTime: this.secondsToMinuteFormat(sessionTime * 60)
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1 id="title" >Pomodoro Clock</h1>
        <p className="author-2">
            Coded and designed by 
            <a href="https://github.com/yakhousam/Pomodoro-Clock">yakhousam
            </a>
          </p>
        <section className="container">
        <div className="about">
          <p className="author">
            Coded and designed by <br/> 
            <a href="https://github.com/yakhousam/Pomodoro-Clock">yakhousam
            </a>
          </p>
        </div>
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
            src={Beep}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default App;
