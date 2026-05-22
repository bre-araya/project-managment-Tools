const express = require("express");
const router = express.Router();
const { createProject, getProjects, inviteMember } = require("../controllers/project.controller");
const protect = require("../middleware/auth.middleware");

router.use(protect); // Secure all project board operations

router.route("/").post(createProject).get(getProjects);
router.post("/:id/invite", inviteMember);

module.exports = router;