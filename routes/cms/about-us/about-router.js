
const express = require('express');
const { resetAboutContent, updateAboutContent, updateAboutTitleImage , getAboutContent} = require('../../../controller/cms/aboutCmsController');


const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/cms/about-us');
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


router.get('/resetAboutContent', resetAboutContent);
router.post('/updateAboutContent', updateAboutContent);
router.get('/getAboutContent', getAboutContent);
router.post('/updateAboutTitleImage', upload.single('file'), updateAboutTitleImage);
// router.delete('/admin/reviews/:id', deleteReview);


module.exports = {
    routes: router
}

