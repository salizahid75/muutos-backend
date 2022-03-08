const express = require('express');
const { addCategory , getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controller/categoryServiceController');

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



// router.post('/category', upload.single('image'), addCategory);
// router.get('/allCategories', getAllCategories);
// router.post('/categoryById/', getCategory);
// router.post('/updateCategory/', updateCategory);
// router.post('/deleteCategoryById/', deleteCategory);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
