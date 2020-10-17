const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EducationSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  profil: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profil'
  },

  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldofstudy: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Education', EducationSchema);
