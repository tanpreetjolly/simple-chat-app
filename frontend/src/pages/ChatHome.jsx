// ChatHome.js
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.addEventListener("message", handleMessage);
    setWs(ws);
  }, [userDetails, selectedUserId]);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      if (userId !== userDetails?._id) {
        people[userId] = username;
      }
    });

    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    console.log({ ev, messageData });
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  }

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    console.log("sending message");
    console.log(newMessage, selectedUserId);
    ws.send(JSON.stringify({ text: newMessage, recipient: selectedUserId }));
    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        try {
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
          // console.log(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchData();
  }, [selectedUserId]);
  
  console.log(onlinePeople);
  return (
    <div className="flex min-h-screen">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <section className="outline w-7/12 bg-blue-400 relative pb-10">
        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />
        <div className="absolute w-full bottom-0 outline flex justify-center items-center">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
