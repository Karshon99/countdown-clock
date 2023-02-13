import "./App.css";
import React from "react";
import SetTime from "./components/SetTime";
import Toggle from "./components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const audio = document.getElementById("beep");

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTime: "Session",
    isPlaying: false,
  };

  constructor(props) {
    super(props);
    this.interval = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.interval);
      this.setState({
        isPlaying: false,
      });
    } else {
      clearInterval(this.interval);
      this.setState({
        isPlaying: true,
      });

      this.interval = setInterval(() => {
        const { clockCount, currentTime, breakCount, sessionCount } =
          this.state;
        if (clockCount === 0) {
          this.setState({
            currentTime: currentTime === "Session" ? "Break" : "Session",
            clockCount:
              currentTime === "Session" ? breakCount * 60 : sessionCount * 60,
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    const { isPlaying } = this.state;
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTime: "Session",
      isPlaying: false,
    });
    if (isPlaying) {
      clearInterval(this.interval);
      this.setState({
        isPlaying: false,
      });
    } else {
      clearInterval(this.interval);
      this.setState({
        isPlaying: true,
      });
    }
    audio.pause();
    audio.currentTime = 0;
  };
  convertToMinutes = (count) => {
    const minutes = Math.floor(count / 60);
    let seconds = count % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };
  handleBreakDecrease = () => {
    const { breakCount } = this.state;
    if (breakCount > 0) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };
  handleBreakIncrease = () => {
    const { breakCount } = this.state;
    if (breakCount < 60) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount > 0) {
      this.setState({
        sessionCount: sessionCount - 1,
      });
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount < 60) {
      this.setState({
        sessionCount: sessionCount + 1,
      });
    }
  };
  render() {
    const { breakCount, sessionCount, clockCount, currentTime } = this.state;
    const breakProps = {
      title: "Break Length",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };
    const sessionProps = {
      title: "Session Length",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };
    return (
      <div className="App">
        <div className="flex wrapper">
          <SetTime {...breakProps} />
          <SetTime {...sessionProps} />
        </div>
        <div className="clock-container">
          <h1>{currentTime}</h1>
          <span>{this.convertToMinutes(clockCount)}</span>
          <div className="flex">
            <Toggle
              onClick={this.handlePlayPause}
              isPlaying={this.state.isPlaying}
            />
            <button onClick={this.handleReset}>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
