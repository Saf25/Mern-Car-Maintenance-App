const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
//prendre les param sous forme JSON
app.use(express.json());
const bodyParser = require("body-parser");

//cors config
app.use(cors("http://localhost:3000"));

//dotenv config
require("dotenv").config();

//env params
PORT = process.env.PORT;
MONGO_URI = process.env.MONGO_URI;

//connect to Database
const connectDB = require("./helpers/connectDB");
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(path.join(__dirname, "../", "client", "build", "index.html"));

//routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/post", require("./routes/postRoute"));

var routes = require("./routes/calendarRoute");
routes(app); //register routes
//rendering the front
app.use(express.static(path.join(__dirname, "../", "client", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"))
);
app.listen(PORT, (err) => {
  err ? console.log(err.message) : console.log(`Server is running on ${PORT}`);
});
