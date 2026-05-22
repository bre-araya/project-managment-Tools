const Comment = require("../models/comment.model");
const Task = require("../models/task.model");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Add a collaborative discussion comment inside a task card
// @route   POST /api/comments
exports.addComment = asyncHandler(async (req, res, next) => {
  const { task: taskId, text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment message body cannot be blank" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Parent task document target not found" });
  }

  const comment = await Comment.create({
    task: taskId,
    user: req.user._id,
    text
  });

  // Push comment object reference ID directly into the target task document
  task.comments.push(comment._id);
  await task.save();

  // Populate user data before sending the response
  const populatedComment = await comment.populate("user", "name avatar");

  res.status(201).json(populatedComment);
});