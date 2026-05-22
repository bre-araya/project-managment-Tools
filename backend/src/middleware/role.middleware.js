// backend/src/middleware/role.middleware.js
const Project = require("../models/project.model");

/**
 * Intercepts requests to verify if the active user possesses the required project role
 * @param {Array} allowedRoles - Example: ['project-manager', 'developer']
 */
const authorizeProjectRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const projectId = req.params.projectId || req.body.project;

      if (!projectId) {
        return res.status(400).json({ message: "Project context identification is missing" });
      }

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Target project workspace not found" });
      }

      // Locate the caller within the board's registered membership array
      const memberRecord = project.members.find(
        (m) => m.user.toString() === req.user._id.toString()
      );

      // If the user isn't on the board, or their role isn't explicitly whitelisted, block them
      if (!memberRecord || !allowedRoles.includes(memberRecord.role)) {
        return res.status(403).json({ 
          message: "Access Denied: Your project role tier does not authorize this operation" 
        });
      }

      // Attach project and user role metadata context onto the request for use in downstream controllers
      req.projectContext = project;
      req.userProjectRole = memberRecord.role;

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authorizeProjectRole;