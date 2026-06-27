const Project = require("../models/project.model");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a new project board
// @route   POST /api/projects
exports.createProject = asyncHandler(async (req, res, next) => {
  const { name, description, status, assignee } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  let assignedUserId = assignee || null;
  if (assignedUserId) {
    const assignedUser = await User.findById(assignedUserId);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }
  }

  const members = [{ user: req.user._id, role: "project-manager" }];
  if (assignedUserId && assignedUserId.toString() !== req.user._id.toString()) {
    members.push({ user: assignedUserId, role: "developer" });
  }

  const project = await Project.create({
    name,
    description,
    status: status || undefined,
    owner: req.user._id,
    members,
  });

  res.status(201).json(project);
});

// @desc    Get all projects the logged-in user belongs to
// @route   GET /api/projects
exports.getProjects = asyncHandler(async (req, res, next) => {
  const filter = req.user.globalRole === "admin"
    ? {}
    : { "members.user": req.user._id };

  const projects = await Project.find(filter).populate("owner", "name email avatar");

  res.json(projects);
});

// @desc    Invite a team member to a board by email
// @route   POST /api/projects/:id/invite
exports.inviteMember = asyncHandler(async (req, res, next) => {
  const { email, role } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project board not found" });
  }

  // Check if current user is the owner or a project-manager
  const callerMember = project.members.find(m => m.user.toString() === req.user._id.toString());
  if (!callerMember || (callerMember.role !== "project-manager" && project.owner.toString() !== req.user._id.toString())) {
    return res.status(403).json({ message: "Not authorized to invite members to this project" });
  }

  const userToInvite = await User.findOne({ email });
  if (!userToInvite) {
    return res.status(444).json({ message: "No user account found with this email address" });
  }

  const alreadyMember = project.members.some(m => m.user.toString() === userToInvite._id.toString());
  if (alreadyMember) {
    return res.status(400).json({ message: "User is already a member of this project" });
  }

  project.members.push({ user: userToInvite._id, role: role || "developer" });
  await project.save();

  res.json({ message: "Member successfully added to project team", project });
});

// @desc    Get a single project by id
// @route   GET /api/projects/:id
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Normalize owner and member ids whether populated or not
  const ownerId = project.owner && project.owner._id ? project.owner._id.toString() : project.owner.toString();
  const isMember = req.user.globalRole === "admin" || ownerId === req.user._id.toString() ||
    project.members.some(m => {
      const memberId = m.user && m.user._id ? m.user._id.toString() : m.user.toString();
      return memberId === req.user._id.toString();
    });

  if (!isMember) {
    return res.status(403).json({ message: "Not authorized to view this project" });
  }

  res.json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
exports.updateProject = asyncHandler(async (req, res, next) => {
  const { name, description, columns, status } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Admins can manage everything; otherwise only owner or project-manager can update
  const callerMember = project.members.find(m => m.user.toString() === req.user._id.toString());
  if (req.user.globalRole !== "admin" && project.owner.toString() !== req.user._id.toString() && (!callerMember || callerMember.role !== "project-manager")) {
    return res.status(403).json({ message: "Not authorized to update this project" });
  }

  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (columns !== undefined && Array.isArray(columns)) project.columns = columns;
  if (status !== undefined) project.status = status;

  await project.save();
  res.json(project);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Admins can delete any project; otherwise only owner may delete it
  const ownerId = project.owner && project.owner._id ? project.owner._id.toString() : project.owner.toString();
  if (req.user.globalRole !== "admin" && ownerId !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only project owner can delete the project" });
  }

  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});