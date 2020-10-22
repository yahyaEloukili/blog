const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  handle: {
    type: String,
    // required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },


  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


// Reverse populate with virtuals
ProfileSchema.virtual('educations', {
  ref: 'Education',
  localField: '_id',
  foreignField: 'profile',
  justOne: false
});

// Cascade delete educations when a bootcamp is deleted
ProfileSchema.pre('remove', async function (next) {
  console.log(`Educations being removed from profile ${this._id}`);
  await this.model('Education').deleteMany({ profile: this._id });
  next();
});
// Reverse populate with virtuals
ProfileSchema.virtual('experiences', {
  ref: 'Experience',
  localField: '_id',
  foreignField: 'profile',
  justOne: false
});
module.exports = mongoose.model('Profile', ProfileSchema);
