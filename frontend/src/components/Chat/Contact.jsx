// Contact.js
import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
}) => {
  return (
    <li
      key={userId}
      className={`${
        selectedUserId === userId ? "bg-teal-100" : ""
      } ${
        !isOnline ? "opacity-60" : ""
      } p-2.5 border-b border-gray-300 hover:bg-gray-100 flex items-center gap-2 hover:cursor-pointer`}
      onClick={() => {
        setSelectedUserId(userId);
      }}
    >
      <Avatar userId={userId} username={username} isOnline={isOnline}/>
      {username}
    </li>
  );
};

export default Contact;
