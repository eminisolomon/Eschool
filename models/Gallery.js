const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    images: {
      type: Array,
      default: [],
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);