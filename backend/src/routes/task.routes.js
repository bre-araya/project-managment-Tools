// backend/src/routes/task.routes.js
const express = require("express");
const router = express.Router();
const { createTask, getProjectTasks, updateTask } = require("../controllers/task.controller");

const protect = require("../middleware/auth.middleware");
const authorizeProjectRole = require("../middleware/role.middleware");

router.use(protect);

// Admins and project members with task rights can create task cards
router.route("/").post(
  authorizeProjectRole(["project-manager", "developer"]),
  createTask
);

// Admins and project members with task rights can update tasks (e.g., drag-and-drop column status changes)
router.route("/:id").put(
  async (req, res, next) => {
    // Lookup task to find its parent project ID before running role check
    const Task = require("../models/task.model");
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task card not found" });
    
    req.body.project = task.project.toString(); // Inject project context into body for middleware
    next();
  },
  authorizeProjectRole(["project-manager", "developer"]),
  updateTask
);

// Admins and board members can fetch and read the task list view
router.route("/project/:projectId").get(
  authorizeProjectRole(["project-manager", "developer", "viewer"]),
  getProjectTasks
);

module.exports = router;