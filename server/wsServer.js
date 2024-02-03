const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel");

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

          // Log authenticated user information
          console.log("User Connected:", connection.userId, connection.username);
        });
      }
    }

    connection.on("message", async (message) => {
      const messageData = JSON.parse(message.toString());
      const { recipient, text } = messageData;
      // console.log(recipient, text, file);
      const msgDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
      });

      if (recipient && text) {
        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                sender: connection.username,
                text,
                id: msgDoc._id,
              })
            );
          }
        });
      }
    });

    // Sending online user list to all clients
    const onlineUsers = Array.from(wss.clients).map((client) => ({
      userId: client.userId,
      username: client.username,
    }));

    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: onlineUsers,
        })
      );
    });

    // Log online users to the console
    // console.log("Online Users:", onlineUsers);
  });
};

module.exports = createWebSocketServer;
