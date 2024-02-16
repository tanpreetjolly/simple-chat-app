// Contact.js
import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
  avatarLink,
}) => {
  return (
    <li
      key={userId}
      className={`${
        selectedUserId === userId ? "bg-primary" : ""
      } capitalize py-2 lg:py-3 px-2 lg:px-5  rounded-[1.3rem]  border-gray-300 hover:bg-primary flex flex-col lg:flex-row items-center gap-1 my-1.5 lg:gap-4 font-medium hover:cursor-pointer lg:my-3 text-white `}
      onClick={() => {
        setSelectedUserId(userId);
        console.log(userId);
      }}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <span className="text-xs lg:text-base text-center">{username}</span>
      {isOnline && (
        <span
          className={`text-xs rounded-full bg-green-500 px-2 py-0.5  z-20 
        }`}
        >
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;
