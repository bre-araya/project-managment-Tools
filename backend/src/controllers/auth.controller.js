const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const JWT_EXPIRES_DAYS = parseInt(process.env.JWT_EXPIRES_DAYS || "7", 10);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_DAYS}d`,
  });
};

const setTokenCookie = (res, token) => {
  const maxAge = JWT_EXPIRES_DAYS * 24 * 60 * 60 * 1000; // ms

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
  });
};

// Register a new user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, globalRole } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  // validate role if provided
  const allowedRoles = ["admin", "user"];
  if (globalRole && !allowedRoles.includes(globalRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password, globalRole });

  // Do NOT auto-login on register. Return success message and user info.
  res.status(201).json({
    message: "Congrats! You registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.globalRole,
    },
  });
});

// Login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  setTokenCookie(res, token);

  // Return token in JSON to simplify testing with Postman (also set as cookie)
  res.json({ id: user._id, name: user.name, email: user.email, token });
});

// Logout user (clear cookie)
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({ message: "Logged out" });
});

// Get current user profile
exports.getMe = asyncHandler(async (req, res, next) => {
  const { _id, name, email, avatar, globalRole } = req.user;
  res.json({ id: _id, name, email, avatar, role: globalRole });
});

// Admin: get all users
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  if (req.user.globalRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.json(users);
});

// Admin: update a user's role
exports.updateUserRole = asyncHandler(async (req, res, next) => {
  if (req.user.globalRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { role } = req.body;
  if (!role || !["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.globalRole = role;
  await user.save();

  res.json({ message: "User role updated", user: { id: user._id, name: user.name, email: user.email, role: user.globalRole } });
});

// Update profile (name, email)
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  if (email && email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res.json({ id: user._id, name: user.name, email: user.email });
});

// Change password
exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Current and new password are required" });
  }

  if (!(await user.matchPassword(currentPassword))) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = newPassword;
  await user.save();

  // issue new token
  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.json({ message: "Password updated" });
});