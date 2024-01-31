// ChatMessages.js
import React, { useEffect, useRef, useState } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const [messagesNew, setMessagesNew] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      // Set the container scrollTop to the scrollHeight with smooth behavior
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesNew, messagesContainerRef]);
  
  useEffect(() => {
    const uniqueMessageIds = new Set();

    const filteredMessages = messages.filter((message) => {
      if (!uniqueMessageIds.has(message._id)) {
        uniqueMessageIds.add(message._id);
        return true;
      }
      return false;
    });

    setMessagesNew(filteredMessages);
  }, [messages]);

  return (
    <div className="absolute bottom-20 w-full px-14 left-1/2 transform -translate-x-1/2 overflow-auto h-[90vh]" ref={messagesContainerRef}>
      {!!selectedUserId && (
        <div className="flex flex-col gap-2 ">
          {messagesNew.map((message) => (
            <div
              key={message._id}
              className={`${
                message.sender !== userDetails._id
                  ? "bg-white text-black self-start"
                  : "bg-blue-500 text-white self-end"
              } p-2.5 rounded-lg`}
            >
              {message.text}
            </div>
          ))}
        </div>
      )}

      {!messagesNew.length && (
        <div className="text-gray-500 text-center mt-4">
          No messages to display.
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
