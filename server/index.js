const express = require("express");
const cors = require("cors");
const router = require("./routes/LoginRoute");
const connectDb = require("./config/connectDb");
const TaskRouter = require("./routes/TaskRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();
connectDb();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api", router);
app.use("/api/task", TaskRouter);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
