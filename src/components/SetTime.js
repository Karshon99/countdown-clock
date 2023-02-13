import React from "react";

const SetTime = (props) => {
  const id = props.title.toLowerCase();
  return (
    <div className="container-time">
      <h1 id={`${id}-label`}>{props.title} Length</h1>
      <div className="flex">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          -
        </button>
        <span id={`${id}-length`}>{props.count}</span>
        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetTime;
