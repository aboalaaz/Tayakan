const path = require('path');
const mongoose = require('mongoose');
const courses = require('./Courses');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `الرجاء ادخال اسم المستخدم`],
    unique: [true, `اسم المستخدم مستخدم`],
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, `الرجاء ادخال الايميل`],
    unique: [true, 'هذا الايميل مسجل'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    password: {
      type: String,
      required: [true, `الرجاء الدخال كلمة المرور`],
      minlength: 6,
      select: false,
    },
  },
  role: {
    type: String,
    enum: ['user', 'supervisor'],
    default: 'user',
  },

  specialization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Specialization',
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Courses',
    },
  ],
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
