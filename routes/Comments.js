const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentTo: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      maxlength: [600, "A comment can't be longer than 600 characters"],
    },
    user: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);