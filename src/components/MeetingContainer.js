import { Constants, useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { Notification } from "./Notification";
import { ParticipantsAudioPlayer } from "./ParticipantsAudioPlayer";
import { ParticipantView } from "./ParticipantView";

export const MeetingContainer = () => {
  const { isMeetingJoined, participants, localParticipant } = useMeeting();
  const { messages } = usePubSub("CHANGE_BACKGROUND");

  const remoteSpeakers = [...participants.values()].filter((participant) => {
    return participant.mode == Constants.modes.CONFERENCE && !participant.local;
  });

  return isMeetingJoined ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor:
          messages.length > 0
            ? messages.at(messages.length - 1).message
            : "#fff",
      }}
    >
      <ParticipantsAudioPlayer />
      <div
        className={`grid-container ${
          remoteSpeakers?.length > 1 ? "more-participant" : "single-participant"
        }`}
        style={{
          display: "grid",
          flex: 1,
          maxHeight: `100vh`,
          overflowY: "auto",
          gap: "20px",
          padding: "20px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {[...remoteSpeakers].map((participant) => {
          return (
            <ParticipantView
              key={participant.id}
              participantId={participant.id}
            />
          );
        })}
      </div>
      <Notification />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div class="loader"></div>
    </div>
  );
};
