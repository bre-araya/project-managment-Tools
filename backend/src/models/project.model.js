// backend/src/models/project.model.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Handles the "Invite members" core requirement
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["project-manager", "developer", "viewer"],
          default: "developer",
        },
      },
    ],
    // Defines columns for the Kanban board layout
    columns: {
      type: [String],
      default: ["To Do", "In Progress", "Review", "Done"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);