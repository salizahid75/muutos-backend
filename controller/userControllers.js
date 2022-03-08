"use strict";

const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;
        var uid = null;
        // Create user
        var snapshot = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        if (snapshot["user"].empty) {
            res.send({ status: "inactive", data: "error occured" });
        } else {
            uid = snapshot["user"].uid;
            console.log(uid);
            data["uid"] = uid;
            await firestore.collection("users").doc().set(data);
            res.send({ status: "active", data: "User added successfully." });
        }
        console.log("User signOut and task completed successfully");
        firebase.auth().signOut();
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection("users");
        const data = await users.get();
        const usersArray = [];
        if (data.empty) {
            res.status(404).send({
                status: "inactive",
                data: "No users found",
            });
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().role,
                    doc.data().name,
                    doc.data().number,
                    doc.data().email,
                    doc.data().password,
                    doc.data().dob,
                    doc.data().uid,
                    doc.data().gender,
                    doc.data().language_selected,
                    doc.data().address,
                    doc.data().profile_picture,
                    doc.data().orders,
                    doc.data().payment_details,
                    doc.data().status,
                );
                usersArray.push(user);
            });
            res.send({ status: "active", data: usersArray });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection("users").doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(404).send({
                status: "inactive",
                data: "User with Id not exit",
            });
        } else {
            res.send({ status: "active", data: data.data() });
        }
    } catch (error) {
        res.status(404).send({
            status: "inactive",
            data: "User with Id not exit",
        });
    }
};

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

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection("users").doc(id).delete();
        res.send({ status: "active", data: "User deleted successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log("details:  " + email + "," + password);
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password) //Here where I want to grab the user with email and password
            .then(async getUser => {
                var currentUser = getUser["user"];
                var currentUserId = currentUser.uid;

                try {
                    const users = await firestore
                        .collection("users")
                        .where("uid", "==", currentUserId);
                    const data = await users.get();
                    const userArray = [];
                    if (data.empty) {
                        res.status(404).send({
                            status: "inactive",
                            data: "No users found",
                        });
                    } else {
                        data.forEach(doc => {
                            const user = new User(
                                doc.id,
                                doc.data().role,
                                doc.data().name,
                                doc.data().number,
                                doc.data().email,
                                doc.data().password,
                                doc.data().dob,
                                doc.data().uid,
                                doc.data().gender,
                                doc.data().language_selected,
                                doc.data().address,
                                doc.data().profile_picture,
                                doc.data().orders,
                                doc.data().payment_details,
                                doc.data().status,
                            );
                            userArray.push(user);
                        });
                        res.send({ status: "active", data: userArray });
                        console.log(
                            "User signOut and task completed successfully"
                        );
                        firebase.auth().signOut();
                    }
                } catch (error) {
                    res.status(400).send({
                        status: "inactive",
                        data: error.message,
                    });
                }
            })
            .catch(error => {
                res.status(400).send({
                    status: "inactive",
                    data: error.message,
                });
                console.log("Email or password invalid!");
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const userProfilePic = async (req, res, next) => {
    try {
        // file update request in form-data
        const file = req.file;

        const id = req.params.id;

        if (file == undefined) {
            console.log("file not found");
            res.send({ status: "inactive", data: "no file to upload" });
        } else {
            console.log("file found ");

            console.log(req.file);

            const profilePic = file.path;
            const uploadPath = "http://localhost:8080/" + profilePic;
            const newData = { profile_picture: uploadPath };
            const userProfile = await firestore.collection("users").doc(id);
            await userProfile.update(newData);
            res.send({ status: "active", data: uploadPath });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    userProfilePic,
};
