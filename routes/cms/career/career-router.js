const express = require('express');
const { resetCareerContent, updateCareerContent, updateCareerTitleImage , getCareerContent} = require('../../../controller/cms/careerCmsController');


const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/cms/career');
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


router.get('/resetCareerContent', resetCareerContent);
router.post('/updateCareerContent', updateCareerContent);
router.get('/getCareerContent', getCareerContent);
router.post('/updateCareerTitleImage', upload.single('file'), updateCareerTitleImage);
// router.delete('/admin/reviews/:id', deleteReview);


module.exports = {
    routes: router
}

