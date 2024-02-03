// OnlineUsersList.js
import React from "react";
import Avatar from "./Avatar";
import Contact from "./Contact"; // Import the new Contact component

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  console.log(offlinePeople);
  console.log(onlinePeople)
  return (
    <section className="outline w-4/12 bg-blue-200">
      {Object.keys(onlinePeople).map((userId) => (
        <Contact
          key={userId}
          userId={userId}
          username={onlinePeople[userId]}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          isOnline={true}
        />
      ))}
      {Object.keys(offlinePeople).map((userId) => {
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
