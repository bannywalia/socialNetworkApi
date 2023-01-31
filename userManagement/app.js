const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api/user-routes");
const app = express();
const url = "mongodb://127.0.0.1:27017/socialnetwork";

app.use(express.json());

app.use("/users", router);

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

app.listen(3000, () => console.log("Connected! Server on port localhost:3000"));
