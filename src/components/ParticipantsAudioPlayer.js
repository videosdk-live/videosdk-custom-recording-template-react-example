import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";

const ParticipantAudio = ({ participantId }) => {
  const { micOn, micStream, isLocal } = useParticipant(participantId);
  const audioPlayer = useRef();

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn && micStream) {
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

export const ParticipantsAudioPlayer = () => {
  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  return participants ? (
    [...participants.keys()].map((participantId) => (
      <ParticipantAudio
        key={`participant_audio_${participantId}`}
        participantId={participantId}
      />
    ))
  ) : (
    <></>
  );
};
