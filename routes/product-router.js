const express = require("express");
const {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    updateProductById,
    deleteProduct,
    addToFeaturedProducts,
    getFeaturedProducts,
    removeFromFeaturedProducts,
    getProductsByCategory,
    getCustomDateProducts,
    updateProductFieldById
} = require("../controller/productController");

const router = express.Router();

const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/productImages");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            "product-"+file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
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

router.post("/product", upload.array("image", 10), addProduct);
router.get("/products", getAllProducts);
router.post("/productById/", getProduct);
router.post("/updateProduct/", upload.array("image", 10), updateProduct);
router.post(
    "/updateProductById/",
    upload.array("image", 10),
    updateProductById
);
router.post("/deleteProductById", deleteProduct);
router.get("/getFeaturedProducts", getFeaturedProducts);
router.post("/addToFeaturedProducts", addToFeaturedProducts);
router.post("/updateProductFieldById", updateProductFieldById);
router.post("/removeFromFeaturedProducts", removeFromFeaturedProducts);
router.post("/getProductsByCategory", getProductsByCategory);
router.post(
    "/getCustomDateProducts",
    upload.array("image", 10),
    getCustomDateProducts
);
// router.put('/product/:id',  upload.multiple('image'), updateProduct);
module.exports = {
    routes: router,
};
