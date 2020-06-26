const mongoose = require('mongoose');

const HomestaySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
},
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
  },
  featured: {
    type: String
  },
  description: {
    type: String
  },
  aminities: {
    type: String
  },
  extras: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  file: {
          type: [String]
     },
});

module.exports = Homestay = mongoose.model('Homestay', HomestaySchema);