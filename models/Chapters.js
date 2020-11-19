const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
    maxlength: [2, 'ادخل رقم الفصل بشكل الصحيح'],
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
ChapterSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Chapter', ChapterSchema);
