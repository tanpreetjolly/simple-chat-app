const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });
  wss.on("connection", (connection, req) => {
    const cookies = req.headers.cookie;
    if (!cookies) return;
    console.log(cookies);
  });
};

module.exports = createWebSocketServer;
