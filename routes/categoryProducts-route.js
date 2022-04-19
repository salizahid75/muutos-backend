const express = require('express');
const { addCategory , getAllCategories, getCategory, updateCategory, deleteCategory, addSubCategory, getSubCategoriesByCategoryId, deleteSubCategoryById, updateCategoryFieldById, getProductCategories, getServiceCategories } = require('../controller/categoryProductController');

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



router.post('/category', upload.single('image'), addCategory);
router.get('/allCategories', getAllCategories);
router.get('/getProductCategories', getProductCategories);
router.get('/getServiceCategories', getServiceCategories);
router.post('/categoryById/', getCategory);
router.post('/updateCategory/', updateCategory);
router.post('/deleteCategoryById/', deleteCategory);
router.post('/addSubcategory',  addSubCategory);
router.post('/getSubCategoriesByCategoryId',  getSubCategoriesByCategoryId);
router.post('/deleteSubCategoryById',  deleteSubCategoryById);
router.post('/updateCategoryFieldById',  updateCategoryFieldById);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
