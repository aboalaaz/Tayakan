const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema(
  {
    specName: {
      type: String,
      required: [true, `ادخل تخصص جديد`],
      unique: [true, `هذا التخصص موجود مسبقاً`],
    },
    code: String,
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, 'ادخل مواد التخصص'],
        ref: 'Courses',
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Specialization', SpecializationSchema);
