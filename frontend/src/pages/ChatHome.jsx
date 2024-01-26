import { useEffect, useState } from "react";
import Avatar from "../components/Chat/Avatar";
import { useProfile } from "../context/profileContext";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  // console.log(userDetails);

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
  // console.log(onlinePeople);
  // console.log(messages);

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
    ws.send(JSON.stringify({ text: newMessage, receiver: selectedUserId }));
    setNewMessage("");
    setMessages((prev) => [...prev, { text: newMessage }]);
  };

  return (
    <div className="flex min-h-screen">
      <nav className="outline w-1/12 bg-blue-200">Nav</nav>
      <section className="outline w-4/12 bg-blue-200">
        {userDetails &&
          userDetails._id &&
          Object.keys(onlinePeople).map((userId) => (
            <li
              key={userId}
              className={`${
                selectedUserId && "bg-teal-100"
              } p-2.5 border-b border-gray-300 hover:bg-gray-100 flex  items-center justify-center gap-2 hover:cursor-pointer`}
              onClick={() => {
                setSelectedUserId(userId);
              }}
            >
              <Avatar userId={userId} username={onlinePeople[userId]} />
              {onlinePeople[userId]}
            </li>
          ))}
      </section>
      <section className="outline w-7/12 bg-blue-400 relative pb-10">
        <div className="absolute bottom-4 w-4/5 left-1/2 transform -translate-x-1/2 ">
          {!!selectedUserId && (
            <div className="flex flex-col gap-2">
              {messages.map((message) => (
                <div
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
          {!!selectedUserId && (
            <form onSubmit={sendMessage} className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
                placeholder="Search"
                value={newMessage}
                onChange={(ev) => setNewMessage(ev.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border"
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
