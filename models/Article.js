const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `يجب ادخال عنوان المقال`],
  },
  article: {
    type: String,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Article', articleSchema);
