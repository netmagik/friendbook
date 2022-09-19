const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
