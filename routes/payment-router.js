const express = require("express");
const {
    addPayment,
    getAllPayments,
    getPayment,
    updatePayment,
    deletePayment,
} = require("../controller/paymentsController");

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/productImages");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    // conditions
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.post("/payment", upload.single("image"), addPayment);
router.get("/allPayments", getAllPayments);
router.post("/paymentById/", getPayment);
router.post("/updatePayment/", updatePayment);
router.post("/deletePaymentById/", deletePayment);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router,
};
