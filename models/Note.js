const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Number,
    default: new Date().getTime()
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);