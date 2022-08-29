import { useState } from "react";
import ReactHowler from "react-howler";
import audioError from "../../../audio/audioError.mp3";

const AudioBtn = ({ audioSrc, children }) => {
  const [audio, setAudio] = useState({
    src: audioSrc || audioError,
    play: false,
  });

  return (
    <div
      onClick={() => setAudio({ ...audio, play: true })}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      <ReactHowler
        src={audio.src}
        playing={audio.play}
        onEnd={() => setAudio({ ...audio, play: false })}
      />
      {children}
    </div>
  );
};

export default AudioBtn;
