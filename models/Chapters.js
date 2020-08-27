const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  number: {
    type: Number,
    maxlength: [2, 'ادخل رقم الفصل بشكل الصحيح'],
    unique: [true, `هذا الشبتر موجود `],
  },
  question: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
  ],
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Courses',
  },
});

module.exports = mongoose.model('Chapter', ChapterSchema);
