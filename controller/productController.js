"use strict";

const firebase = require("../db");
const product = require("../models/products");
var storage = require("@google-cloud/storage");
const firestore = firebase.firestore();
const { uuid } = require("uuidv4");

const addProduct = async (req, res, next) => {
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
        const images = [];
        file.forEach((img)=>{
            images.push(img.filename);
        })
        if(req.body.userEmail!==undefined){
            const users = await firestore.collection("users").where("email", "==", req.body.userEmail);
            const user = await users.get();
            var userId
            user.forEach(doc=>{
                userId = doc.id;
            })
            const {
                name,
                description,
                sku,
                material,
                origin,
                brand,
                userEmail,
                price,
                availability,
                stock,
                deliveryTerms,
                category,
                status,
                audience,
                sizes,
                options,
                language,
                colors,
                isFeatured,
            } = req.body;
            const data = {
                userId:userId,
                language: language,
                status: status,
                name: name,
                description: description,
                sku: sku,
                userEmail:userEmail,
                category: category,
                audience: audience,
                material: material,
                sizes: sizes,
                colors: colors,
                origin: origin,
                brand: brand,
                price: price,
                stock: stock,
                availability: availability,
                options: options,
                deliveryTerms: deliveryTerms,
                isFeatured: 0,
                isApproved: false,
                addedOn: date,
                updatedOn: dateTime,
                images: images || [],
            };
            console.log("data:" + JSON.stringify(data));
            await firestore.collection("products").add(data);
            res.send({ status: "active", data: "Product added successfully." });
        }else{
            const {
                userId,
                name,
                description,
                sku,
                material,
                origin,
                brand,
                price,
                availability,
                stock,
                deliveryTerms,
                category,
                status,
                audience,
                sizes,
                options,
                language,
                colors,
                isFeatured,
            } = req.body;
            const data = {
                userId:userId,
                language: language,
                status: status,
                name: name,
                description: description,
                sku: sku,
                category: category,
                audience: audience,
                material: material,
                sizes: sizes,
                colors: colors,
                origin: origin,
                brand: brand,
                price: price,
                stock: stock,
                availability: availability,
                options: options,
                deliveryTerms: deliveryTerms,
                isFeatured: 0,
                featuredLocation:'',
                isApproved: false,
                addedOn: date,
                updatedOn: dateTime,
                images: images || [],
            };
            // console.log("data:" + JSON.stringify(data));
            await firestore.collection("products").add(data);
            res.send({ status: "active", data: "Product added successfully." });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getAllProducts = async (req, res, next) => {
    
    try {
        let productDB = {};
        if (req?.query?.isFeatured) {
            if (req.query.search) {
                productDB = await firestore
                    .collection("products")
                    .where("isFeatured", "==", 1)
                    .where("name", ">=", req.query.search)
                    .where("name", "<=", req.query.search + "\uf8ff");
            }
            if (req.query.filter) {
                switch (req?.query?.filter) {
                    case "new":
                        productDB = await firestore
                            .collection("products")
                            .where("isFeatured", "==", 1)
                            .orderBy("addedOn", "desc");
                        break;
                    case "old":
                        productDB = await firestore
                            .collection("products")
                            .where("isFeatured", "==", 1)
                            .orderBy("addedOn", "asc");
                        break;

                    default:
                        productDB = await firestore
                            .collection("products")
                            .where("isFeatured", "==", 1);
                        break;
                }
            } else {
                productDB = await firestore
                    .collection("products")
                    .where("isFeatured", "==", 1);
            }
        } else if (req?.query?.search) {
            productDB = await firestore
                .collection("products")
                .where("name", ">=", req.query.search)
                .where("name", "<=", req.query.search + "\uf8ff");
        } else if (req?.query?.filter) {
            switch (req?.query?.filter) {
                case "new":
                    productDB = await firestore
                        .collection("products")
                        .orderBy("addedOn", "desc");
                    break;
                case "old":
                    productDB = await firestore
                        .collection("products")
                        .orderBy("addedOn", "asc");
                    break;

                default:
                    productDB = await firestore.collection("products");
                    break;
            }
        } else {
            productDB = await firestore.collection("products");
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

const getProduct = async (req, res, next) => {
    try {
        const id = req.body.id;
        const product = await firestore
            .collection("products")
            .doc(id)
            .get()
            .then(snapshot => {
                if (snapshot.data() !== null && snapshot.data() !== undefined) {
                    res.send({ status: "active", data: snapshot.data() });
                } else {
                    res.status(404).send({
                        status: "inactive",
                        message: "Product with Id not exit",
                    });
                }
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const updateProduct = async (req, res, next) => {
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
        const {
            id,
            name,
            description,
            sku,
            material,
            origin,
            brand,
            price,
            availability,
            stock,
            deliveryTerms,
            category,
            status,
            audience,
            sizes,
            options,
            language,
            colors,
            images,
            isFeatured,
            addedOn,
        } = req.body;
        const data = {
            id: id,
            name: name,
            description: description,
            sku: sku,
            material: material,
            origin: origin,
            brand: brand,
            price: price,
            availability: availability,
            stock: stock,
            deliveryTerms: deliveryTerms,
            category: category,
            status: status,
            audience: audience,
            sizes: sizes,
            options: options,
            language: language,
            colors: colors,
            updatedOn: dateTime,
            images: images,
        };

        await firestore
            .collection("products")
            .doc(id)
            .update(data)
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active", data: data });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const updateProductById = async (req, res, next) => {
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
        const images = [];
        if(file!==undefined){
            file.forEach((img)=>{
                images.push(img.filename);
            })
        }
        const {
            id,
            name,
            description,
            sku,
            material,
            origin,
            brand,
            price,
            availability,
            stock,
            deliveryTerms,
            category,
            status,
            audience,
            sizes,
            options,
            language,
            isApproved,
            colors,
            isFeatured,
        } = req.body;
        const data = {
            language: language,
            status: status,
            name: name,
            description: description,
            sku: sku,
            category: category,
            audience: audience,
            material: material,
            sizes: sizes,
            colors: colors,
            origin: origin,
            brand: brand,
            price: price,
            stock: stock,
            availability: availability,
            options: options,
            deliveryTerms: deliveryTerms,
            isFeatured: isFeatured,
            isApproved: isApproved,
            addedOn: date,
            updatedOn: dateTime,
            images: images || [],
            updatedOn: dateTime
        };
        await firestore
            .collection("products")
            .doc(id)
            .update(data)
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore
            .collection("products")
            .doc(id)
            .delete()
            .then(async () => {
                res.send({
                    status: "active",
                    data: "Product deleted successfully",
                });
            })
            .catch(function (error) {
                res.send({ status: "inactive", data: "Product Not Deleted" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const productDB = await firestore
            .collection("products")
            .where("isFeatured", "==", 1).where("userId", "==", req.body.vendorId);
        await productDB.get().then(querySnapshot => {
            const tempDoc = [];
            querySnapshot.forEach(doc => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).send({ status: "active", data: tempDoc });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getAllFeaturedProducts = async (req, res) => {
    try {
        const productDB = await firestore
            .collection("products")
            .where("isFeatured", "==", 1);
        await productDB.get().then(querySnapshot => {
            const tempDoc = [];
            querySnapshot.forEach(doc => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).send({ status: "active", data: tempDoc });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const addToFeaturedProducts = async (req, res) => {
    try {
        const { featuredProductId, featuredProductLocation } = req.body;
        const data = {
            id: featuredProductId,
            isFeatured: 1,
            featuredLocation:featuredProductLocation
        };

        await firestore
            .collection("products")
            .doc(data.id)
            .update(data)
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active", data: data });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const removeFromFeaturedProducts = async (req, res) => {
    try {
        const { id } = req.body;
        const data = {
            id: id,
            isFeatured: 0,
        };

        await firestore
            .collection("products")
            .doc(id)
            .update(data)
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active", data: data });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const productDB = await firestore
            .collection("products")
            .where("category", "==", category);
        await productDB.get().then(querySnapshot => {
            const tempDoc = [];
            querySnapshot.forEach(doc => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).send({ status: "active", data: tempDoc });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getCustomDateProducts = async (req, res) => {
    try {
        let productDB;
        if (req.body.query == "daily") {
            var today = new Date();
            var date =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            productDB = await firestore
                .collection("products")
                .where("addedOn", "==", date);
        } else if (req.body.query == "monthly") {
            var today = new Date();
            var date = today.getFullYear() + "-" + (today.getMonth() + 1);
            console.log(date);
            productDB = await firestore
                .collection("products")
                .where("addedOn", ">=", date)
                .where("addedOn", "<=", date + "~");
        } else if (req.body.query == "yearly") {
            var today = new Date();
            var date1 =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            var date3 = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
            var date2 =
                date3.getFullYear() +
                "-" +
                (date3.getMonth() + 1) +
                "-" +
                date3.getDate();
            console.log(date2);
            productDB = await firestore
                .collection("products")
                .where("addedOn", ">=", date2)
                .where("addedOn", "<=", date1 + "~");
        } else if (req.body.query == "weekly") {
            var today = new Date();
            var date1 =
                today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate();
            var date3 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            var date2 =
                date3.getFullYear() +
                "-" +
                (date3.getMonth() + 1) +
                "-" +
                date3.getDate();
            productDB = await firestore
                .collection("products")
                .where("addedOn", ">=", date2)
                .where("addedOn", "<=", date1 + "~");
        } else {
            productDB = await firestore.collection("products");
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


const updateProductFieldById = async (req, res, next) => {
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
        const {field, value, id} = req.body
        await firestore
            .collection("products")
            .doc(id)
            .update({'isApproved': value})
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};





module.exports = {
    addProduct,
    getAllProducts,
    getAllFeaturedProducts,
    getProduct,
    updateProduct,
    updateProductById,
    deleteProduct,
    getFeaturedProducts,
    addToFeaturedProducts,
    removeFromFeaturedProducts,
    getProductsByCategory,
    getCustomDateProducts,
    updateProductFieldById
};
