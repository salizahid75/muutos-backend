"use strict";
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();


const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection("users").doc(id);
        await user.update(data);
        res.send({ status: "active", data: "User updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};



const deleteReview = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection("reviews").doc(id).delete();
        res.send({ status: "active", data: "Review deleted successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

module.exports = {
    updateUser,
    deleteReview
};
