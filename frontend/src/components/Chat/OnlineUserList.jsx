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
      <div className="text-black">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
