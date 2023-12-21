require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const cookieParser = require('cookie-parser')
//database connection
connection();
app.use(cookieParser())

//middlewares
app.use(express.json());
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4000",
];

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 204,
	credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions)); //for dev
// app.use(cors());	//for production

app.use("/api/user", userRoute);
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASS);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Application Running on Port ${port}`));
