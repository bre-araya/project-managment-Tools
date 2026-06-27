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

  const isAdmin = req.user.globalRole === "admin";
  const isProjectMember = project.members.some((member) => member.user.toString() === req.user._id.toString()) || project.owner.toString() === req.user._id.toString();

  if (!isAdmin && !isProjectMember) {
    return res.status(403).json({ message: "Not authorized to create tasks in this project" });
  }

  const task = await Task.create({
    project: projectId,
    title,
    description,
    status: status || "To Do",
    priority: priority || "medium",
    assignees: Array.isArray(assignees) ? assignees : (assignees ? [assignees] : [])
  });

  res.status(201).json(task);
});

// @desc    Get all tasks belonging to a specific project board
// @route   GET /api/tasks/project/:projectId
exports.getProjectTasks = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isAdmin = req.user.globalRole === "admin";
  const isMember = isAdmin || project.members.some((member) => member.user.toString() === req.user._id.toString()) || project.owner.toString() === req.user._id.toString();

  if (!isMember) {
    return res.status(403).json({ message: "Not authorized to view tasks for this project" });
  }

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

  const project = await Project.findById(task.project);
  const isAdmin = req.user.globalRole === "admin";
  const isProjectMember = project && (project.members.some((member) => member.user.toString() === req.user._id.toString()) || project.owner.toString() === req.user._id.toString());

  if (!isAdmin && !isProjectMember) {
    return res.status(403).json({ message: "Not authorized to update this task" });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("assignees", "name email avatar");

  res.json(task);
});