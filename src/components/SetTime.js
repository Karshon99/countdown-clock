import React from "react";

const SetTime = (props) => {
  return (
    <div className="container-time">
      <h1 id={`${props.title.toLowerCase()}-label`}>{props.title}</h1>
      <div className="flex">
        <button onClick={props.handleDecrease}>-</button>
        <span>{props.count}</span>
        <button onClick={props.handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default SetTime;
