import React, { useEffect, useMemo, useRef } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

const ParticipantAudioPlayer = ({ participantId }) => {
  const { micOn, micStream, isLocal } = useParticipant(participantId);
  const audioPlayer = useRef();

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((err) => {});
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return <audio autoPlay playsInline controls={false} ref={audioPlayer} />;
};

const ParticipantsAudioPlayer = () => {
  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  return participants ? (
    [...participants.keys()].map((participantId) => (
      <ParticipantAudioPlayer
        key={`participant_audio_${participantId}`}
        participantId={participantId}
      />
    ))
  ) : (
    <></>
  );
};

const VideoComponent = (props) => {
  const { webcamStream, webcamOn } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  return (
    <div>
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"320px"}
          width={"180px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

const MeetingContainer = () => {
  const meeting = useMeeting();

  return meeting.isMeetingJoined ? (
    <>
      <ParticipantsAudioPlayer />
      {[...meeting?.participants?.keys()].map((participantId) => (
        <VideoComponent key={participantId} participantId={participantId} />
      ))}
    </>
  ) : (
    <p>waiting to join</p>
  );
};

export default function App() {
  const { meetingId, token, participantId } = useMemo(() => {
    const location = window.location;

    const urlParams = new URLSearchParams(location.search);

    const paramKeys = {
      meetingId: "meetingId",
      token: "token",
      participantId: "participantId",
    };

    Object.keys(paramKeys).forEach((key) => {
      paramKeys[key] = urlParams.get(key)
        ? decodeURIComponent(urlParams.get(key))
        : null;
    });

    return paramKeys;
  }, []);

  return meetingId && token && participantId ? (
    <div>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: false,
          name: "recorder",
          participantId,
        }}
        token={token}
        joinWithoutUserInteraction
      >
        <MeetingContainer />
      </MeetingProvider>
    </div>
  ) : null;
}
