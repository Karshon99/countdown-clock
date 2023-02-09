import "./App.css";
import React from "react";
import SetTime from "./components/SetTime";
import Toggle from "./components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
  };
  render() {
    const { breakCount, sessionCount } = this.state;
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
          <h1>Session</h1>
          <span>25:00</span>
          <div className="flex">
            <Toggle />
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
