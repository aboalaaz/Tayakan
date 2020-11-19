const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // required: [true, 'الرجاء ادخال اسم المادة'],
  },
  nameA: {
    type: String,
    trim: true,
    // required: [true, 'الرجاء ادخال اسم المادة'],
  },
  code: {
    type: String,
    trim: true,
    required: [true, 'الرجاء ادخال كود المادة'],
    // unique: [true, 'هذا الكود موجود مسبقاً'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  title: {
    type: String,
  },
  article: {
    type: String,
  },
  specialization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Specialization',
    // autopopulate: true,
  },

  chapters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Chapter',
      // autopopulate: true,
    },
  ],
  supervisor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});
CoursesSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Courses', CoursesSchema);
