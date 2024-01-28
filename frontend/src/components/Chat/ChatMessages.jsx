// ChatMessages.js
import React, { useEffect, useState } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const [messagesNew, setMessagesNew] = useState([]);
  console.log(messages);
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
  console.log(messages);
  return (
    <div className="absolute bottom- w-4/5 left-1/2 transform -translate-x-1/2">
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messagesNew.map((message) => (
            <div
              key={message._id}
              className={`${
                message.sender === userDetails._id
                  ? "bg-blue-500 text-white self-end"
                  : message.sender === selectedUserId
                  ? "bg-gray-100 text-gray-900 self-start"
                  : ""
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
