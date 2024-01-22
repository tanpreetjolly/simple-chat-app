const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });
  wss.on("connection", (connection, req) => {
    // console.log(req.headers);
    const cookies = req.headers.cookie;
    // console.log(cookies)
    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.startsWith("authToken="));
      // console.log(tokenString);
      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) console.log(err);
          // console.log(userData);
          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;
          // connection.lastName = `${lastName}`;
        });
      }
    }
    console.log([...wss.clients].length);
  });

};

module.exports = createWebSocketServer;
