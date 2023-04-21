import { usePubSub } from "@videosdk.live/react-sdk";
import { useEffect, useRef, useState } from "react";

export const Notification = () => {
  const timeoutRef = useRef(null);
  const handleChatMessage = (msg) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage(msg);
    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, 3200);
  };
  const [message, setMessage] = useState(null);
  const { publish } = usePubSub("VIEWER_MESSAGE", {
    onMessageReceived: handleChatMessage,
  });
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return message ? (
    <div
      style={{
        backgroundColor: "#232830",
        padding: "10px",
        textAlign: "center",
        color: "#fff",
        position: "absolute",
        bottom: "50px",
        left: "30px",
        borderRadius: "10px",
        animation: "fadein 0.5s",
      }}
    >
      <strong>
        {message.senderName} says {message.message}
      </strong>
    </div>
  ) : null;
};
