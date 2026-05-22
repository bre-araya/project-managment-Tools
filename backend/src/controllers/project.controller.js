const Project = require("../models/project.model");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Create a new project board
// @route   POST /api/projects
exports.createProject = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "project-manager" }]
  });

  res.status(201).json(project);
});

// @desc    Get all projects the logged-in user belongs to
// @route   GET /api/projects
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({
    "members.user": req.user._id
  }).populate("owner", "name email avatar");

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