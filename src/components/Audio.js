import React from "react";

const Audio = (props) => {
  return (
    <audio
      ref={props.audioRef}
      id="beep"
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    ></audio>
  );
};
export default Audio;
