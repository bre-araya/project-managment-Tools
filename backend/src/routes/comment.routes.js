// backend/src/routes/comment.routes.js
const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/comment.controller");

const protect = require("../middleware/auth.middleware");
const authorizeProjectRole = require("../middleware/role.middleware");

// ⚠️ Everyone (Manager, Dev, and Viewer) can add updates to active task discussions
router.post(
  "/", 
  protect, 
  authorizeProjectRole(["project-manager", "developer", "viewer"]), 
  addComment
);

module.exports = router;