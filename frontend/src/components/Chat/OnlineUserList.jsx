// OnlineUsersList.js
import React from "react";
import Avatar from "./Avatar";

const OnlineUsersList = ({
  onlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  // console.log(onlinePeople)
  return (
    <section className="outline w-4/12 bg-blue-200">
      {Object.keys(onlinePeople).map((userId) => (
        <li
          key={userId}
          className={`${
            selectedUserId && "bg-teal-100"
          } p-2.5 border-b border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 hover:cursor-pointer`}
          onClick={() => {
            setSelectedUserId(userId);
          }}
        >
          <Avatar userId={userId} username={onlinePeople[userId]} />
          {onlinePeople[userId]}
        </li>
      ))}
    </section>
  );
};

export default OnlineUsersList;
