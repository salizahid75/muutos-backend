"use strict";

const firebase = require("../db");
var storage = require("@google-cloud/storage");
const firestore = firebase.firestore();
const { uuid } = require("uuidv4");

const addStaff = async (req, res, next) => {
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    try {
        const file = req.files;
        console.log(file);
        let images = [];
        file.forEach(f => {
            images.push(f.path);
        });
        const {
            ownerId,
            speciality,
            status,
            image,
            name,
            email,
            mobile,
            description,
            workingHours,
            charges,
        } = req.body;
        const data = {
            ownerId: ownerId,
            speciality: speciality,
            status: status,
            name: name,
            email: email,
            mobile: mobile,
            description: description,
            workingHours: workingHours,
            charges: charges,
            isFeatured: 0,
            addedOn: date,
            updatedOn: dateTime,
            images: images || [],
        };
        console.log("data:" + JSON.stringify(data));
        await firestore.collection("staff").add(data);
        res.send({ status: "active", data: "Staff added successfully." });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getAllStaff = async (req, res, next) => {
    try {
        // console.log(req.query)
        let {ownerId, search} = req.query;
        let productDB = {};
        if (req?.query?.isFeatured) {
            if (search) {
                productDB = await firestore
                    .collection("staff")
                    .where("ownerId", "==", ownerId)
                    .where("isFeatured", "==", 1)
                    .where("name", ">=", search)
                    .where("name", "<=", search + "\uf8ff");
            }
            if (req.query.filter) {
                switch (req?.query?.filter) {
                    case "new":
                        productDB = await firestore
                            .collection("staff")
                            .where("ownerId", "==", ownerId)
                            .where("isFeatured", "==", 1)
                            .orderBy("addedOn", "desc");
                        break;
                    case "old":
                        productDB = await firestore
                            .collection("staff")
                            .where("ownerId", "==", ownerId)
                            .where("isFeatured", "==", 1)
                            .orderBy("addedOn", "asc");
                        break;

                    default:
                        productDB = await firestore
                            .collection("staff")
                            .where("ownerId", "==", ownerId)
                            .where("isFeatured", "==", 1);
                        break;
                }
            } else {
                productDB = await firestore
                    .collection("staff")
                    .where("ownerId", "==", ownerId)
                    .where("isFeatured", "==", 1);
            }
        } else if (req?.query?.search) {
            productDB = await firestore
                .collection("staff")
                .where("ownerId", "==", ownerId)
                .where("name", ">=", search)
                .where("name", "<=", search + "\uf8ff");
        } else if (req?.query?.filter) {
            switch (req?.query?.filter) {
                case "new":
                    productDB = await firestore
                        .collection("staff")
                        .where("ownerId", "==", ownerId)
                        .orderBy("addedOn", "desc");
                    break;
                case "old":
                    productDB = await firestore
                        .collection("staff")
                        .where("ownerId", "==", ownerId)
                        .orderBy("addedOn", "asc");
                    break;

                default:
                    productDB = await firestore
                        .collection("staff")
                        .where("ownerId", "==", ownerId);
                    break;
            }
        } else {
            productDB = await firestore.collection("staff");
        }
        await productDB.get().then(querySnapshot => {
            const tempDoc = [];
            querySnapshot.forEach(doc => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).send({ status: "active", data: tempDoc });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getStaff = async (req, res, next) => {
    try {
        const id = req.body.id;
        const product = await firestore
            .collection("staff")
            .doc(id)
            .get()
            .then(snapshot => {
                if (snapshot.data() !== null && snapshot.data() !== undefined) {
                    res.send({ status: "active", data: snapshot.data() });
                } else {
                    res.status(404).send({
                        status: "inactive",
                        message: "Staff with Id not exit",
                    });
                }
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

// const updateProduct = async (req, res, next) => {
//     var today = new Date();
//     var date =
//         today.getFullYear() +
//         "-" +
//         (today.getMonth() + 1) +
//         "-" +
//         today.getDate();
//     var time =
//         today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date + " " + time;

//     try {
//         const {
//             id,
//             name,
//             description,
//             sku,
//             material,
//             origin,
//             brand,
//             price,
//             availability,
//             stock,
//             deliveryTerms,
//             category,
//             status,
//             audience,
//             sizes,
//             options,
//             language,
//             colors,
//             images,
//             isFeatured,
//             addedOn,
//         } = req.body;
//         const data = {
//             id: id,
//             name: name,
//             description: description,
//             sku: sku,
//             material: material,
//             origin: origin,
//             brand: brand,
//             price: price,
//             availability: availability,
//             stock: stock,
//             deliveryTerms: deliveryTerms,
//             category: category,
//             status: status,
//             audience: audience,
//             sizes: sizes,
//             options: options,
//             language: language,
//             colors: colors,
//             updatedOn: dateTime,
//             images: images,
//         };

//         await firestore
//             .collection("products")
//             .doc(id)
//             .update(data)
//             .then(async () => {
//                 console.log("Document Updated successfully");
//                 res.send({ status: "active", data: data });
//             });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

const updateStaffById = async (req, res, next) => {
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    console.log(req.body)
    try {
        const id = req.body.id
        const data = {
            id:req.body.id,
            ownerId: req.body.ownerId,
            speciality: req.body.speciality,
            status: req.body.status,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            description: req.body.description,
            workingHours: req.body.workingHours,
            charges: req.body.charges,
            updatedOn: dateTime,
            images: req.body.image || [],
        };
        await firestore
            .collection("staff")
            .doc(id)
            .update(data)
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active", msg:"Staff Updated Successfully" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const deleteStaff = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore
            .collection("staff")
            .doc(id)
            .delete()
            .then(async () => {
                res.send({
                    status: "active",
                    data: "Staff deleted successfully",
                });
            })
            .catch(function (error) {
                res.send({ status: "inactive", data: "Encountered Error While Updating Staff" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

// const getFeaturedProducts = async (req, res) => {
//     try {
//         const productDB = await firestore
//             .collection("products")
//             .where("isFeatured", "==", 1);
//         await productDB.get().then(querySnapshot => {
//             const tempDoc = [];
//             querySnapshot.forEach(doc => {
//                 tempDoc.push({ id: doc.id, ...doc.data() });
//             });
//             res.status(200).send({ status: "active", data: tempDoc });
//         });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

// const addToFeaturedProducts = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const data = {
//             id: id,
//             isFeatured: 1,
//         };

//         await firestore
//             .collection("products")
//             .doc(id)
//             .update(data)
//             .then(async () => {
//                 console.log("Document Updated successfully");
//                 res.send({ status: "active", data: data });
//             });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

// const removeFromFeaturedProducts = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const data = {
//             id: id,
//             isFeatured: 0,
//         };

//         await firestore
//             .collection("products")
//             .doc(id)
//             .update(data)
//             .then(async () => {
//                 console.log("Document Updated successfully");
//                 res.send({ status: "active", data: data });
//             });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

// const getProductsByCategory = async (req, res) => {
//     try {
//         const { category } = req.body;
//         const productDB = await firestore
//             .collection("products")
//             .where("category", "==", category);
//         await productDB.get().then(querySnapshot => {
//             const tempDoc = [];
//             querySnapshot.forEach(doc => {
//                 tempDoc.push({ id: doc.id, ...doc.data() });
//             });
//             res.status(200).send({ status: "active", data: tempDoc });
//         });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

// const getCustomDateProducts = async (req, res) => {
//     try {
//         let productDB;
//         if (req.body.query == "daily") {
//             var today = new Date();
//             var date =
//                 today.getFullYear() +
//                 "-" +
//                 (today.getMonth() + 1) +
//                 "-" +
//                 today.getDate();
//             productDB = await firestore
//                 .collection("products")
//                 .where("addedOn", "==", date);
//         } else if (req.body.query == "monthly") {
//             var today = new Date();
//             var date = today.getFullYear() + "-" + (today.getMonth() + 1);
//             console.log(date);
//             productDB = await firestore
//                 .collection("products")
//                 .where("addedOn", ">=", date)
//                 .where("addedOn", "<=", date + "~");
//         } else if (req.body.query == "yearly") {
//             var today = new Date();
//             var date1 =
//                 today.getFullYear() +
//                 "-" +
//                 (today.getMonth() + 1) +
//                 "-" +
//                 today.getDate();
//             var date3 = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
//             var date2 =
//                 date3.getFullYear() +
//                 "-" +
//                 (date3.getMonth() + 1) +
//                 "-" +
//                 date3.getDate();
//             console.log(date2);
//             productDB = await firestore
//                 .collection("products")
//                 .where("addedOn", ">=", date2)
//                 .where("addedOn", "<=", date1 + "~");
//         } else if (req.body.query == "weekly") {
//             var today = new Date();
//             var date1 =
//                 today.getFullYear() +
//                 "-" +
//                 (today.getMonth() + 1) +
//                 "-" +
//                 today.getDate();
//             var date3 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//             var date2 =
//                 date3.getFullYear() +
//                 "-" +
//                 (date3.getMonth() + 1) +
//                 "-" +
//                 date3.getDate();
//             productDB = await firestore
//                 .collection("products")
//                 .where("addedOn", ">=", date2)
//                 .where("addedOn", "<=", date1 + "~");
//         } else {
//             productDB = await firestore.collection("products");
//         }
//         await productDB.get().then(querySnapshot => {
//             const tempDoc = [];
//             querySnapshot.forEach(doc => {
//                 tempDoc.push({ id: doc.id, ...doc.data() });
//             });
//             res.status(200).send({ status: "active", data: tempDoc });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({ status: "inactive", data: error.message });
//     }
// };

module.exports = {
    addStaff,
    getAllStaff,
    getStaff,
    // updateProduct,
    updateStaffById,
    deleteStaff,
    // getFeaturedProducts,
    // addToFeaturedProducts,
    // removeFromFeaturedProducts,
    // getProductsByCategory,
    // getCustomDateProducts,
};
