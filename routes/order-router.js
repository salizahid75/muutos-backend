const express = require('express');
const { addOrder , getAllOrder, getOrder, updateOrder, deleteOrder, getOrdersByUserId } = require('../controller/orderController');

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



router.post('/order', upload.single('image'), addOrder);
router.get('/allOrder', getAllOrder);
router.post('/orderById/', getOrder);
router.post('/updateOrder/', updateOrder);
router.post('/deleteOrderById/', deleteOrder);
router.post('/getOrdersByUserId', getOrdersByUserId)
// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router
}
