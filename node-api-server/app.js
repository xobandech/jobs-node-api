require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require('cors')
const http = require("http");
const app = express();
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const morgan = require("morgan");
const io = require("socket.io")
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use(cors())
// extra packages
// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(authMiddleware);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = http.createServer(app)
const ioServer = new io.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});
const port = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
  );

  ioServer.on("connection", (socket) => {
    console.log("A user connected");
    socket.emit("message", "Welcome to the server!");
    socket.on("newJob", function (job) {
      console.log(job);
  });
  })
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = { app, ioServer, start };