// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Post schema
const PostSchema = new Schema({
  title: { 
    type: String, 
    required: true,
},
  content: { 
    type: String, 
    required: true, 
},
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
},
  tags: { 
    type: [String] 
},
  createdAt: { 
    type: Date, 
    default: Date.now()
},
  comments: {
    type: Array,
    default: [],
  },
});

// Sets the createdAt parameter equal to the current time
PostSchema.pre('save', (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('Post', PostSchema);