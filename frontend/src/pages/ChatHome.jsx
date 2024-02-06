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
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();

  const connectToWebSocket = () => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.addEventListener("message", handleMessage);
    setWs(ws);
  };
  useEffect(() => {
    connectToWebSocket();
    ws?.addEventListener("close", () => {
      connectToWebSocket();
    });
  }, [userDetails, selectedUserId]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        try {
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchData();
  }, [selectedUserId]);
  
  useEffect(() => {
    axios.get("/api/user/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== userDetails?._id)
        .filter((p) => !onlinePeople[p._id]);
      setOfflinePeople(
        offlinePeopleArr.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {})
      );
    });
  }, [onlinePeople, userDetails]);

  useEffect(() => {
    const handleRealTimeMessage = (event) => {
      const messageData = JSON.parse(event.data);

      if ("text" in messageData) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    };

    // Add event listener for real-time messages
    if (ws) {
      ws.addEventListener("message", handleRealTimeMessage);
    }

    return () => {
      // Remove the event listener when component unmounts
      if (ws) {
        ws.removeEventListener("message", handleRealTimeMessage);
      }
    };
  }, [ws, selectedUserId]);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      if (userId !== userDetails?._id) {
        people[userId] = username;
      }
    });

    setOnlinePeople(people);
  };

  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

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
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchData();
  }, [selectedUserId]);

  return (
    <div className="flex min-h-screen  bg-background ">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />
      <section className="w-[62%] relative pb-10">
        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />
        <div className="absolute w-full bottom-0 flex justify-center items-center">
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
