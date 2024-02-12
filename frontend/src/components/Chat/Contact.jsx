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
      className={`${selectedUserId === userId ? "bg-primary" : ""} capitalize py-3 px-5  rounded-[1.3rem]  border-gray-300 hover:bg-primary flex items-center gap-4 font-medium hover:cursor-pointer my-3 text-white `}
      onClick={() => {
        setSelectedUserId(userId);
      }}
    >
      <Avatar userId={userId} username={username} isOnline={isOnline} />
      {username}
    </li>
  );
};

export default Contact;
