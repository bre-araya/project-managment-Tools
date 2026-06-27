const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  updateUserRole,
} = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", protect, getMe);
router.get("/users", protect, getAllUsers);
router.put("/users/:id/role", protect, updateUserRole);
router.put("/me", protect, updateProfile);
router.put("/me/password", protect, changePassword);

module.exports = router;