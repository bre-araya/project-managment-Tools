const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* ✅ THIS MUST EXIST */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

// Central error handler
app.use(errorHandler);

module.exports = app;