import "./App.css";
import React from "react";
import SetTime from "./components/SetTime";
import Audio from "./components/Audio";
import Toggle from "./components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

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
    this.audioRef = React.createRef();
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
          this.audioRef.current.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTime: "Session",
      isPlaying: false,
    });
    clearInterval(this.interval);

    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
  };
  convertToMinutes = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  handleLengthChange = (typeOfCount, typeOfTimer) => {
    const { isPlaying, breakCount, currentTime, sessionCount } = this.state;

    let newCount;
    if (typeOfTimer === "session") {
      newCount = sessionCount + typeOfCount;
    } else {
      newCount = breakCount + typeOfCount;
    }
    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${typeOfTimer}Count`]: newCount,
      });
      if (currentTime.toLowerCase() === typeOfTimer) {
        this.setState({
          clockCount: newCount * 60,
        });
      }
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTime } = this.state;
    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, "break"),
      handleIncrease: () => this.handleLengthChange(1, "break"),
    };
    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session"),
    };
    return (
      <div className="App">
        <Audio audioRef={this.audioRef} />
        <div className="flex wrapper">
          <SetTime {...breakProps} />
          <SetTime {...sessionProps} />
        </div>
        <div className="clock-container">
          <h1 id="timer-label">{currentTime}</h1>
          <span id="time-left">{this.convertToMinutes(clockCount)}</span>
          <div className="flex">
            <Toggle
              onClick={this.handlePlayPause}
              isPlaying={this.state.isPlaying}
            />
            <button id="reset" onClick={this.handleReset}>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
