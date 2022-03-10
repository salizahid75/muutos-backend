const express = require('express');
const { addAnnouncement , getAllAnnouncements, getAnnouncement, updateAnnouncement, deleteAnnouncement, getAllAnnouncementsByVendor } = require('../controller/announcementController');

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



router.post('/announcement', addAnnouncement);
router.post('/getAllAnnouncementsByVendor', getAllAnnouncementsByVendor);
router.get('/allAnnouncements', getAllAnnouncements);
router.post('/announcementById/', getAnnouncement);
router.post('/updateAnnouncement/', updateAnnouncement);
router.post('/deleteAnnouncementById/', deleteAnnouncement);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
