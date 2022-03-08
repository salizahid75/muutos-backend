const express = require("express");
const {
    addStaff,
    getAllStaff,
    // getStaff,
    // updateStaff,
    updateStaffById,
    // deleteStaff,
    // addToFeaturedStaffs,
    // getFeaturedStaffs,
    // removeFromFeaturedStaffs,
    // getStaffsByCategory,
    // getCustomDateStaffs,
} = require("../controller/staffController");

const router = express.Router();

const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/staffImages");
    },
    filename: function (req, file, cb) {
        return cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
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

router.post("/staff", upload.array("image", 10), addStaff);
router.get("/allStaff", getAllStaff);
// router.post("/staffById/", getStaff);
// router.post("/updateStaff/", upload.array("image", 10), updateStaff);
router.post("/updateStaffById/", upload.array("image", 10), updateStaffById);
// router.post("/deleteStaffById", deleteStaff);
// router.get("/getFeaturedStaffs", getFeaturedStaffs);
// router.post("/addToFeaturedStaffs", addToFeaturedStaffs);
// router.post("/removeFromFeaturedStaffs", removeFromFeaturedStaffs);
// router.post("/getStaffsByCategory", getStaffsByCategory);
// router.post(
//     "/getCustomDateStaff",
//     upload.array("image", 10),
//     getCustomDateStaffs
// );
// router.put('/product/:id',  upload.single('image'), updateProduct);
module.exports = {
    routes: router,
};
