const express = require('express');
const { addReview , getAllReviews, getReview, deleteReview } = require('../controller/reviewsController');

const router = express.Router();

router.post('/review', addReview);
router.get('/allReviews', getAllReviews);
router.post('/reviewById/', getReview);
router.post('/deleteReview/', deleteReview);
module.exports = {
    routes: router
}
