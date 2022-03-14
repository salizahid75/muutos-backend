const express = require("express");
const {
    addService,
    getAllServices,
    getService,
    updateService,
    deleteService,
    addToFeaturedServices,
    getFeaturedServices,
    removeFromFeaturedServices,
    getServiceByType,
    getCustomDateServices,
    updateServiceById,
    updateServiceFieldById
} = require("../controller/servicesController");

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/serviceImages");
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

router.post("/service", upload.array("image"), addService);
router.get("/allServices", getAllServices);
router.post("/serviceById/", getService);
router.post("/updateService/", updateService);
router.post(
    "/updateServiceById/",
    upload.array("image", 10),
    updateServiceById
);
router.post("/updateServiceFieldById", updateServiceFieldById);
router.post("/deleteServiceById/", deleteService);
router.post("/getFeaturedServices", getFeaturedServices);
router.post("/addToFeaturedServices", addToFeaturedServices);
router.post("/removeFromFeaturedServices", removeFromFeaturedServices);
router.post("/getServiceByType", getServiceByType);
router.post(
    "/getCustomDateServices",
    upload.array("image", 10),
    getCustomDateServices
);

// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router,
};
