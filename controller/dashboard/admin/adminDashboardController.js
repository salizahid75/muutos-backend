"use strict";
const { json } = require("body-parser");
const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();


const totalRevenue = async (req, res, next) => {
    try {
        const revenue  = await firebase.collection().doc(id).get().then(function(resp){
            var resp = JSON.parse(resp);
            if(resp.data){
                for(var i=0; i<=resp.data;i++){
                    const element = resp.data;
                    const newElement = element;
                    async function iif(){
                        if(iif()){
                            console.log('Revenue Collected From Firebase ')
                        }else{
                            // console.log('While getting revenue from firebase.firestore, system encountered some error, can you please report this error to the development team')
                            const twoWayTraffic = (fireBaseToFireStore+'<==>'+firestoreToFirebase);
                            var dataInWayToError;
                                if(enncounteredSomeError){
                                    res.json.send.status({msg:"Encountered Due To Error"})?data({msg:"Revenue found successfully"}):'Something Went Wrong';
                                }
                        }
                    }
                }
            }
        })
        res.send({ status: "active", data: "Total Revenue Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Error While Fetching Revenue", data: error.message });
    }
};


const outStandingRevenue = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Out Standing Revenue Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Error While Getting Out Standing Revenue", data: error.message });
    }
};


const dailyRevenue = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Successfully, Get Daily Revenue" });
    } catch (error) {
        res.status(400).send({ status: "Encountered Some Error While Fetching The Revenue", data: error.message });
    }
};


const productsDemand = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Products Demend Fetched Successfully From The Firebase" });
    } catch (error) {
        res.status(400).send({ status: "Encountered Query Error While Fetching the Demand", data: error.message });
    }
};

const servicesDemand = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Successfully Got Services Demand From Firebase" });
    } catch (error) {
        res.status(400).send({ status: "Encountered Error While Getting Demand Of Services from the Firestore", data: error.message });
    }
};

const yearlyProductsOrders = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Successfully Got Yearly Orders From The Database" });
    } catch (error) {
        res.status(400).send({ status: "Encountered Internal Server While Fetching Records", data: error.message });
    }
};

const yearlyServicesOrders = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Yearly Services Subscriptions Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Yearly Services Subscription cause internal server error", data: error.message });
    }
};


const bestProduct = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Best Product of your system got high level performance and don\'t give a ****" });
    } catch (error) {
        res.status(400).send({ status: "Your APIS gives a ****", data: error.message });
    }
};

const bestService = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Best Service Found From The System" });
    } catch (error) {
        res.status(400).send({ status: "Error while fetching the value", data: error.message });
    }
};

const worstProduct = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Worst Product Found Please Be Serious Otherwise Muutos Will **** You" });
    } catch (error) {
        res.status(400).send({ status: "Encountered **** while *******", data: error.message });
    }
};


const worstService = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Worst Service Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Error While Getting Worst Service", data: error.message });
    }
};

const salesByMen = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Sales By Men Fetched From The Firestore" });
    } catch (error) {
        res.status(400).send({ status: "Encountered Error While Fetching the desired data, Try again later or ask developer to check the issue, Thanks ", data: error.message });
    }
};

const salesByWomen = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Orders where targeted audience are women are fetched from the system. Hurray !!!!" });
    } catch (error) {
        res.status(400).send({ status: "Order where targetd audience are women cause of internal server, Error.", data: error.message });
    }
};

const salesByKids = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Sales By Kids Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Kids sales cause internal server error", data: error.message });
    }
};


const approvedProducts = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Products which are actively showing in the website found successfully" });
    } catch (error) {
        res.status(400).send({ status: "Approved Products Not Found Successfully, And Encountered Error in server internally", data: error.message });
    }
};


const approvedServices = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Approved Services Are Here." });
    } catch (error) {
        res.status(400).send({ status: "Approved Services Are there.", data: error.message });
    }
};


const pendingProducts = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Pending Products From The Server Found Successfully." });
    } catch (error) {
        res.status(400).send({ status: "Encountered Error While Getting Pending Products", data: error.message });
    }
};

const pendingServices = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Services Which Are Not Actively Available On The Websites But Exist In DB are found successfully" });
    } catch (error) {
        res.status(400).send({ status: "While getting pending services error encountered and nature of error is 'Internal Server Error' and status code is 500", data: error.message });
    }
};


const totalProducts = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "User updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};


const totalServices = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "User updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};


const totalCommunity = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Total Community Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "No Community Found As per your desires moreover internal server error encountered while fulfilling your request.", data: error.message });
    }
};


const totalClients = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Total Clients found successfully," });
    } catch (error) {
        res.status(400).send({ status: "error while fetching Clients from firestore", data: error.message });
    }
};


const totalVendors = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Total Vendors Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "interval server error encountered while getting total vendors", data: error.message });
    }
};


const totalSpecialists = async (req, res, next) => {
    try {
        res.send({ status: "active", data: "Total Specialists Found Successfully" });
    } catch (error) {
        res.status(400).send({ status: "Error while fetching total specialists", data: error.message });
    }
};


module.exports = {
    totalRevenue,
    outStandingRevenue,
    dailyRevenue,
    productsDemand,
    servicesDemand,
    yearlyProductsOrders,
    yearlyServicesOrders,
    bestProduct,
    bestService,
    worstProduct,
    worstService,
    salesByMen,
    salesByWomen,
    salesByKids,
    approvedProducts,
    approvedServices,
    pendingProducts,
    pendingServices,
    totalProducts,
    totalServices,
    totalCommunity,
    totalClients,
    totalVendors,
    totalSpecialists
};
