const express = require('express');
const { addComment, getAllComments, getComment, updateComment, deleteComment, getItemCommentsById, likeComment} = require('../controller/commentsController');

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

router.post('/comment', upload.array('image', 10), addComment);
router.get('/allComments', getAllComments);
router.post('/commentById/', getComment);
router.post('/updateComment/', updateComment);
router.post('/deleteCommentById', deleteComment);
router.post('/getItemCommentsById', getItemCommentsById);
router.post('/likeComment', likeComment)
// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
