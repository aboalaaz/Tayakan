const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'الرجاء ادخال اسم المادة'],
  },
  code: {
    type: String,
    trim: true,
    required: [true, 'الرجاء ادخال كود المادة'],
    unique: [true, 'هذا الكود موجود مسبقاً'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  title: {
    type: String,
    required: [true, 'الرجاء كتابه عنوان المقاله الخاصه بالمادة'],
  },
  article: {
    type: String,
    required: [true, 'الرجاء كتابه مقاله عن المادة'],
  },
  specialization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Specialization',
    required: [true, 'الرجاء اختيار تخصص الماده'],
    unique: true,
  },
  chapters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Chapter',
    },
  ],
});

module.exports = mongoose.model('Courses', CoursesSchema);
