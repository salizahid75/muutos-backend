const express = require('express');

const {updateWorldContent, getWorldContent, resetWorldContent, updateWorldImage } = require('../../../controller/cms/worldCmsController');

const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/cms/world');
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

router.get('/resetWorldContent', resetWorldContent);
router.post('/updateWorldContent', updateWorldContent);
router.get('/getWorldContent', getWorldContent);
router.post('/updateWorldImage', upload.single('file'), updateWorldImage);

module.exports = {
    routes: router
}

