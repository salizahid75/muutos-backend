"use strict";
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();


const totalRevenue = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Total Revenue Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: 'Something Went Wrong While Collecting total revenue from the database.' });
    }
};


const dailyRevenue = async (req, res, next) => {

    try {
       res.status(200).send({data:"Daily Revenue From the google cloud firestore found successfully."}) 
    } catch (error) {
        res.status(500).send({msg:"Something Went Wrong While Fetching Desired Data from the google cloud firestore."})
    }

}

const productsDemand = async (req, res, next) => {

    try {
        res.status(200).send({msg:"Products Demand From The Database Google Cloud Found Successfully."})    
    } catch (error) {
        res.status(200).send({msg:"Somethong went wrong, while fetching Product Demand Data From Database"})
    }

}


const servicesDemand = async (req, res, next) => {
    try {
        res.status(200).send({msg:"Services Demand Fro Firestore Found Successfully"});
    } catch (error) {
        res.status(500).send({msg:"Something Went Wrong While Fetching Services Demands From the the cloud."})
    }
}

const yearlyProductsOrders = async (req, res, next) => {

    try {
        res.status(200).send({msg:"Annualy Products Orders From The Database Found Successfully From The Google Cloud Storage"})
    } catch (error) {
        res.status(500).send({msg:"Something went wrng while fetching the yearly products orders from the google cloud storage"})        
    }

}


const yearlyServicesOrders = async (req, res, next) => {

    try {
        res.status(200).send({msg:"Annualy Services From the google cloud database found successfully. "})
    } catch (error) {
        res.status(500).send({msg:"Something went wrong while fetching data from the database or maybe it could be a issue related tou internal server or anything else. Find Yourself the error and don't me again."})
    }

}


const bestProduct = async (req, res, next) => {

    try {
        res.status(200).send({msg:"Best Product From The Google Cloud Storage found Successfully."})
    } catch (error) {
        res.status(500).send({msg:"Error While Fetching From The Google Clund Storage."})
    }

}


const bestService =  async  (req, res, next) => {

    try {
        res.status(200).send({msg:"Best Service From The Google Cloud Storage Is Found Successfully."})
    } catch (error) {   
        res.status(500).send({msg:"Something went wrong while fetching the data from the database."})
    }

}

const salesByMen = async (req, res, next) => {
    try {
        res.status(200).send({msg:"Items where the target audience is men which are sold already and already delivered to the customer found successfully from the database you can view it from the postman or any othe http request handler."})    
    } catch (error) {
        res.status(500).send({msg:"Items where the target audience is men could not be fetched from the database, or maybe it could be the error related to internal server."})
    }
}


const salesByKids = async (req, res, next) => {
    try {
        res.status(200).send({msg:"Items where the target audience is kids found successfully."})
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})        
    }
}


const salesByWomen = async (req, res, next) => {

    try {
        const Data = await Orders.findAll({where:{targetedAudience:'women'}});
        if(Data.status===200){
            res.status(200).send({msg:"Sales By Women", data:Data})
        }else{
            res.status(401).send({msg:"No Data Found"})
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }

}


const worstProduct = async (req, res, next) => {

    try {
        var worstProduct = await Products.findAll({where:{orderId:req.body.Data.Data.yearlyServicesOrders.Products.dailyOrders}});
        if(worstProduct === 200){
            res.status(200).send({msg:"Product with the least reviews and public interaction or have compromised quality found successfully from the database"});
        }else{
            res.status(401).send({msg:"No Data Found"})
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }

}

const worstService = async (req, res, next) => {
    try {
        var worstService = await  Services.findAll({where:{order!:a}});
        if(worstService){
            res.status(200).send({msg:"Services with the least reviews and public interaction or have compromised quality found successfully from the database"})
        }else{
            res.status(401).send({msg:"Services with the least reviews and public interaction or have compromised quality couldn\'t be fetched from the system or may be it could be the issue related to internal server error. Don\'t ever ask me again the silly question again find the error by yourself if you can\'t do it then please switch you professional field to some other."})
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }
}

module.exports = {
    totalRevenue,
    dailyRevenue,
    productsDemand,
    servicesDemand,
    yearlyProductsOrders,
    yearlyServicesOrders,
    bestProduct,
    bestService,
    salesByMen,
    salesByKids,
    salesByWomen,
    worstProduct,
    worstService,
};
