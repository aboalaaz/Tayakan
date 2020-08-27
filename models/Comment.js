const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  article: {
    type: String,
    required: [true, 'الرجاء كتابه التعليق'],
    maxlength: 500,
  },
  like: {
    type: Number,
    default: 0,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
  },
  subcomment: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Comment', CommentSchema);

// photo
