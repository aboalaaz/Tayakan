const crypto = require('crypto');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, `الرجاء ادخال اسم المستخدم `],
    // unique: [true, `اسم المستخدم مستخدم`],
    maxlength: 15,
  },
  name: {
    type: String,
    // required: [true, `الرجاء ادخال اسمك `],
    // unique: [true, `اسم المستخدم مستخدم`],
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
  },
  role: {
    type: String,
    enum: ['user', 'supervisor'],
    default: 'user',
  },

  specialization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Specialization',
    autopopulate: true,
  },
  article: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Article',
    },
  ],
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Courses',
      autopopulate: true,
    },
  ],
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  bio: {
    type: String,
    maxlength: 50,
  },
  points: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
  successAnswer: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
  ],
  wrongAnswer: [
    {
      type: mongoose.Schema.ObjectId,
      count: Number,
      ref: 'Question',
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
