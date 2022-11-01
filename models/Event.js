const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isReminderSet: {
    type: Boolean,
    default: false,
    required: true,
  },
  eventDate: {
    type: Number,
    min: [new Date().getTime() + 1, 'Remind time should be bigger than current time'],
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

module.exports = mongoose.model("Event", eventSchema);