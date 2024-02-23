import Review from '../models/reviewModels.js';

const getReviews = async (req, res) => {
  try {
    const { bagName } = req.params;
    const reviews = await Review.find({item: bagName}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to add a review
const addReview = async (req, res) => {
  try {
    const { user, rating, comment, item } = req.body;

    // Check if the user has already reviewed this item
    const existingReview = await Review.findOne({ user: user?.user.firstName, item });
    if (existingReview) {
      return res.status(200).json({ message: 'You have already reviewed this item.' });
    }

    // Create a new review object
    const newReview = new Review({
      user: user?.user.firstName, // Use the user's first name
      rating,
      comment,
      item
    });

    // Save the review to the database
    await newReview.save();

    // Send a success response
    res.status(201).json({ message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


 export {getReviews, addReview} 



// const getReviews = async (req, res) => {
//     try {
//       const { bagName } = req.query;
//       // Assuming 'bagName' is a field in the 'itemInfo' collection
//       const reviews = await Review.find()
//         .populate({
//           path: 'item',
//           match: { bagName }, // Apply the filter based on 'bagName'
//         })
//         .sort({ createdAt: -1 });
//       res.status(200).json(reviews);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  

// const addReview = async (req, res) => {    
//   const { user, rating, comment, item } = req.body;
//   try {
//     const newReview = new Review({ user, rating, comment, item });
//     await newReview.save();
//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export { getReviews, addReview };






