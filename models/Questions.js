const mongoose = require('mongoose');
const User = require('../models/User');

// This Schema for Generate Questions (True or False, Fill the Blanck, Multi Choice)
const QuestionSchema = new mongoose.Schema({
  Type: {
    type: String,
    enum: ['TRUE OR FALSE', 'Fill in the blanks', 'Multiple-choice'],
  },
  question: {
    type: String,
  },

  Answer: {
    type: Object,
  },
  incurrectAnswerArray: [
    {
      type: String,
    },
  ],

  points: {
    type: Number,
  },
  chapter: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chapter',
  },
  course:{
    type: mongoose.Schema.ObjectId,
    ref: 'Courses'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  CreatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Question', QuestionSchema);
