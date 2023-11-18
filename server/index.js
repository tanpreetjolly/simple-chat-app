require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Application Running on Port ${port}`));
