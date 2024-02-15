const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel");
const { clear } = require("console");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        Array.from(wss.clients).map(async (client) => {
          const { userId, username } = client;
          // Assuming you have a User model and it has an avatarLink field
          const user = await User.findById(userId);
          const avatarLink = user ? user.avatarLink : null;

          return {
            userId,
            username,
            avatarLink,
          };
        })
      );

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      });
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("dead");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

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
          // console.log(
          //   "User Connected:",
          //   connection.userId,
          //   connection.username
          // );
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
    notifyAboutOnlinePeople();
    // Sending online user list to all clients

    // Log online users to the console
    // console.log("Online Users:", onlineUsers);
  });
};

module.exports = createWebSocketServer;
