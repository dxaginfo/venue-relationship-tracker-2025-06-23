const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Venue name is required'],
    trim: true
  },
  address: {
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zip: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true,
      default: 'USA'
    }
  },
  venue_type: {
    type: String,
    enum: ['club', 'theater', 'festival', 'bar', 'cafe', 'concert_hall', 'arena', 'other'],
    default: 'other'
  },
  capacity: {
    type: Number,
    min: 0
  },
  website: {
    type: String,
    trim: true
  },
  social_media: {
    facebook: String,
    instagram: String,
    twitter: String
  },
  notes: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updated_at' field on save
venueSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Index for faster querying
venueSchema.index({ user_id: 1 });
venueSchema.index({ name: 'text' });

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;