//env file
require("dotenv").config();

//imports
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//create the server
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//mongoose
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//routes
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/whatsapp", require("./routes/whatsapp.js"));
app.use("/prerecorded", require("./routes/prerecorded.js"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));

//start the server
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
