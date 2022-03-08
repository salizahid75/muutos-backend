const express = require("express");
const {
    addDiscount,
    getAllDiscounts,
    getDiscount,
    updateDiscount,
    deleteDiscount,
    thirstyCrow
} = require("../controller/discountController");

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

router.post("/discount", upload.single("image"), addDiscount);
router.get("/allDiscounts", getAllDiscounts);
router.post("/discountById/", getDiscount);
router.post("/updateDiscount/", updateDiscount);
router.post("/deleteDiscountById/", deleteDiscount);
router.post("/muutosmuutosmuutos/", thirstyCrow);
// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router,
};
