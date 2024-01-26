// ChatMessages.js
import React from "react";

const ChatMessages = ({ messagesWithoutDupes, userDetails, selectedUserId }) => {
  return (
    <div className="absolute bottom-4 w-4/5 left-1/2 transform -translate-x-1/2 ">
      {!!selectedUserId && (
        <div className="flex flex-col gap-2">
          {messagesWithoutDupes.map((message) => (
            <div
              key={message._id}
              className={`${
                message.sender === userDetails._id
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-100 text-gray-900"
              } p-2.5 rounded-lg`}
            >
              {message.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
