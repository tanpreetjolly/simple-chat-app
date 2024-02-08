import React, { useState } from "react";
import Avatar from "./Avatar";
import Contact from "./Contact";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) =>
    onlinePeople[userId].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="w-[30%] m-3">
      <div className="text-white flex items-center gap-2 p-3 bg-primary w-[90%] mx-auto rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </div>
      {filteredOnlinePeople.map((userId) => (
        <Contact
          key={userId}
          userId={userId}
          username={onlinePeople[userId]}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          isOnline={true}
        />
      ))}
      {filteredOfflinePeople.map((userId) => {
        const { _id, firstName, lastName } = offlinePeople[userId];

        return (
          <Contact
            key={_id}
            userId={_id}
            username={`${firstName} ${lastName}`}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            isOnline={false}
          />
        );
      })}
    </section>
  );
};

export default OnlineUsersList;
