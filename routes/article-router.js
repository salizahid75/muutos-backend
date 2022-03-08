const express = require('express');
const { addArticle, getAllArticles, getArticle, updateArticle, deleteArticle, addToFeaturedArticles, getFeaturedArticles, removeFromFeaturedArticles } = require('../controller/articlesController');

const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/productImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // conditions
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/article', upload.array('image', 10), addArticle);
router.get('/allArticles', getAllArticles);
router.post('/articleById/', getArticle);
router.post('/updateArticle/', updateArticle);
router.post('/deleteArticleById', deleteArticle);
router.get('/getFeaturedArticles', getFeaturedArticles);
router.post('/addToFeaturedArticles', addToFeaturedArticles);
router.post('/removeFromFeaturedArticles', removeFromFeaturedArticles);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
