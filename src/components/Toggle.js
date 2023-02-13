import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
class Toggle extends React.Component {
  render() {
    return (
      <button id="start_stop" onClick={this.props.onClick}>
        <FontAwesomeIcon icon={!this.props.isPlaying ? faPlay : faPause} />
      </button>
    );
  }
}
export default Toggle;
