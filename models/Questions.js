const mongoose = require('mongoose');
const User = require('../models/User');

// This Schema for Generate Questions (True or False, Fill the Blanck, Multi Choice)
const QuestionSchema = new mongoose.Schema({
  Type: {
    type: String,
    enum: ['صح و خطا', 'اختيار من متعدد', 'فراغات'],
  },
  question: {
    type: mongoose.Mixed,
    required: [true, `الرجاء كتابة السؤال`],
  },
  TorF: {
    type: Boolean,
  },
  Answer: {
    type: Object,
    required: [true, 'الرجاء ادخال الاجابه الصحيحه'],
  },

  incurrectAnswerArray: {
    type: [Object],
  },
  // FillBlanks: {
  //   type: Object,
  // },
  points: {
    type: Number,
    default: 2,
  },
  chapters: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chapter',
    required: [true, 'الرجاء ادخال الفصل الخاص بسؤال'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);
