const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
 user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
 },
 company : {
     type: String
 },
 location: {
    type: String,
    required: true
 },
 phone: {
     type: String
 },
 address: {
     type: String,
     required: true
 },
 email: {
     type: String
 },
 product: {
     type: [String],
     required: true
 },
 productcat: {
     type: String,
     required: true
 },
  file: {
          type: [String]
     },   
// Social Media links
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
      }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema);
