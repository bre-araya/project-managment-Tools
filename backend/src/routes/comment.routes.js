// backend/src/routes/comment.routes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const { addComment } = require("../controllers/comment.controller");

const protect = require("../middleware/auth.middleware");
const authorizeProjectRole = require("../middleware/role.middleware");

// ⚠️ Everyone (Manager, Dev, and Viewer) can add updates to active task discussions
router.post(
  "/",
  protect,
  async (req, res, next) => {
    const { task: taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required to add a comment" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    req.body.project = task.project;
    next();
  },
  authorizeProjectRole(["project-manager", "developer", "viewer"]),
  addComment
);

module.exports = router;