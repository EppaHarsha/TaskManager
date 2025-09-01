require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./Routes/authRoutes.js");
const taskRouter = require("./Routes/taskRoutes.js");
const app = express();
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

function db() {
  mongoose
    .connect(MONGO_URL)
    .then((res) => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("error in connecting db", err);
    });
}

app.use("/", authRouter);
app.use("/tasks",taskRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000");
  db();
});
