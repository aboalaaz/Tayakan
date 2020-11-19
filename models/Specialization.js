const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
  specName: {
    type: String,
    required: [true, `ادخل تخصص جديد`],
    unique: [true, `هذا التخصص موجود مسبقاً`],
  },
  code: String,
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Courses',
      // autopopulate: true,
    },
  ],
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
});
SpecializationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Specialization', SpecializationSchema);
