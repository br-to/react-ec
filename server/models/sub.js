const mongoose = require('mongoose');

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: 'name is required',
      minlength: [2, 'too short'],
      maxlength: [32, 'too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sub', subSchema);
