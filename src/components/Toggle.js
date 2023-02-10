import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isButtonPlaying: true };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick();
    this.setState((prevState) => ({
      isButtonPlaying: !prevState.isButtonPlaying,
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        <FontAwesomeIcon icon={this.state.isButtonPlaying ? faPlay : faPause} />
      </button>
    );
  }
}
export default Toggle;
