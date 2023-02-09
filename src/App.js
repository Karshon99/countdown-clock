import "./App.css";
import React from "react";
import SetTime from "./components/SetTime";

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
        <div>Clock Here</div>
      </div>
    );
  }
}

export default App;
