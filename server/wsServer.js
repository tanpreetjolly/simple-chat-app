const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });
  wss.on("connection", (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) console.log(err);
          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;
        });
      }
    }

    // Sending online user list to all clients
    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          online: Array.from(wss.clients).map((client) => ({
            userId: client.userId,
            username: client.username,
          })),
        })
      );
    });
  });
};

module.exports = createWebSocketServer;
