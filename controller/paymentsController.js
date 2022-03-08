"use strict";

const firebase = require("../db");
// const Services = require('../models/Servicess');
var storage = require("@google-cloud/storage");
const firestore = firebase.firestore();
const { uuid } = require("uuidv4");
const secretKey =
    "sk_test_51I2LWDFilxkNqfOODRyNRkO46AEOskiuXcc21wMArGDQUQ6t8BfjDH9wyYxfS4Jgz8s7mHgY5GDpObjcJKKr7p6G0069XzTURd";
const stripe = require("stripe")(secretKey);

const addPayment = async (req, res, next) => {
    try {

        //  = req.body.cart;
        const cart= req.body.cart;
        const newCart = [];
        cart.forEach(product=>{
            const a = {
                price_data:{
                    currency:'qar',
                    product_data:{
                        name: product.name
                    },
                    unit_amount:parseInt(product.price)
                },
                quantity:product.quantity?product.quantity:3,
            }
            newCart.push(a);
        })
        const data = {
            payment_method_types: ["card"],
            line_items: newCart,
            mode: "payment",
            success_url: "http://localhost:3000/products/cart",
            cancel_url: "http://localhost:3000/services/cart",
        };
        const session = await stripe.checkout.sessions.create(data);
        await firestore.collection("payments").add(data);
        res.send({
            status: "active",
            data: "Payment added successfully.",
            id: session.id,
            orderData : data
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const getAllPayments = async (req, res, next) => {
    try {
        const serviceDB = await firestore.collection("discounts");
        await serviceDB.get().then(querySnapshot => {
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

const getPayment = async (req, res, next) => {
    try {
        const id = req.body.id;
        const serviceDB = await firestore
            .collection("discounts")
            .doc(id)
            .get()
            .then(snapshot => {
                if (snapshot.data() !== null && snapshot.data() !== undefined) {
                    res.send({ status: "active", data: snapshot.data() });
                } else {
                    res.status(404).send({
                        status: "inactive",
                        message: "Service with Id not exit",
                    });
                }
            });
    } catch (error) {
        res.status(400).send({
            status: "inactive",
            data: "Service is not defined ",
        });
    }
};

const updatePayment = async (req, res, next) => {
    try {
        const {
            id: id,
            startingFrom,
            endingAt,
            discountTitle,
            products,
            services,
            discountPercentage,
        } = req.body;

        const data = {
            id: id,
            startingFrom: startingFrom,
            endingAt: endingAt,
            discountTitle: discountTitle,
            products: products,
            services: services,
            discountPercentage: discountPercentage,
        };

        await firestore
            .collection("discounts")
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

const deletePayment = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore
            .collection("discounts")
            .doc(id)
            .delete()
            .then(async () => {
                res.send({
                    status: "active",
                    data: "Discount deleted successfully",
                });
            })
            .catch(function (error) {
                res.send({ status: "inactive", data: "Discount Not Deleted" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

module.exports = {
    addPayment,
    getAllPayments,
    getPayment,
    updatePayment,
    deletePayment,
};
