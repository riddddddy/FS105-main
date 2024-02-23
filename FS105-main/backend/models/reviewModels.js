import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  item : {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;


