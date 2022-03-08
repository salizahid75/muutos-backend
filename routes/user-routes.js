const express = require('express');
const { addUser, getAllUsers, getUser, updateUser, deleteUser, loginUser, userProfilePic } = require('../controller/userControllers');


const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/userProfile');
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


router.post('/userRegister', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/userLogin',loginUser);
router.put('/userProfilePic/:id', upload.single('profile_picture'), userProfilePic);

module.exports = {
    routes: router
}

