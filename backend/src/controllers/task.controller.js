const Task = require("../models/task.model");
const Project = require("../models/project.model");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a task card inside a project column
// @route   POST /api/tasks
exports.createTask = asyncHandler(async (req, res, next) => {
  const { project: projectId, title, description, status, priority, assignees } = req.body;

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Target project board not found" });
  }

  const task = await Task.create({
    project: projectId,
    title,
    description,
    status: status || "To Do",
    priority: priority || "medium",
    assignees: assignees || []
  });

  res.status(201).json(task);
});

// @desc    Get all tasks belonging to a specific project board
// @route   GET /api/tasks/project/:projectId
exports.getProjectTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ project: req.params.projectId })
    .populate("assignees", "name email avatar")
    .populate({
      path: "comments",
      populate: { path: "user", select: "name avatar" }
    });

  res.json(tasks);
});

// @desc    Update a task card (Handles Kanban layout drag-and-drop column switches)
// @route   PUT /api/tasks/:id
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task card not found" });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("assignees", "name email avatar");

  res.json(task);
});