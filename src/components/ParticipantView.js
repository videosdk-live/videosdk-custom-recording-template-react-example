import { useParticipant } from "@videosdk.live/react-sdk";
import { useMemo } from "react";
import ReactPlayer from "react-player";
import MicOffIcon from "../icons/MicOffIcon";

export const ParticipantView = (props) => {
  const { webcamStream, webcamOn, displayName, micOn } = useParticipant(
    props.participantId
  );

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  return (
    <div
      className="participant-view"
      style={{
        width: "100%",
        height: "400px",
        maxWidth: "600px",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#1A1C22",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      class="video-cover"
    >
      {webcamOn && webcamStream ? (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ) : (
        <div
          style={{
            fontSize: "50px",
            color: "#fff",
          }}
        >
          {String(displayName).charAt(0).toUpperCase()}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: "10px",
          bottom: "10px",
          backgroundColor: "#050A0E",
          color: "#fff",
          padding: "4px",
          borderRadius: "4px",
          alignItems: "center",
          justifyItems: "center",
          display: "flex",
        }}
      >
        {displayName}{" "}
        {!micOn && <MicOffIcon fillcolor="#fff" height="18" width="18" />}
      </div>
    </div>
  );
};
