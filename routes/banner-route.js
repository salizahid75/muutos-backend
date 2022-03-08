const express = require('express');
const { addBanner,
    getAllBanners,
    getBanner,
    updateBanner,
    deleteBanner } = require('../controller/bannerController');

const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/bannerImages');
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

router.post('/addBanner', upload.single('image'), addBanner);
router.get('/getBanners', getAllBanners);
router.get('/banner/:id', getBanner);
router.put('/updateBanner/:id', upload.single('image'), updateBanner);
router.delete('/deleteBanner/:id', deleteBanner);

module.exports = {
    routes: router
}