import "./App.css";
import React from "react";
import SetTime from "./components/SetTime";
import Toggle from "./components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTime: "Session",
    isPlaying: false,
  };
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
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  convertToMinutes = (count) => {
    const minutes = Math.floor(count / 60);
    let seconds = count % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
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
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
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
