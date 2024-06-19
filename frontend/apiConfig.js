// apiConfig.js
let baseUrl;
let socketUrl;

if (import.meta.env.VITE_NODE_ENV === "production") {
  baseUrl = "https://simple-chat-app-6yeb.onrender.com";
  socketUrl = "wss://simple-chat-app-6yeb.onrender.com";
} else {
  baseUrl = "http://localhost:4000";
  socketUrl = "ws://localhost:4000";
}

export { baseUrl, socketUrl };
