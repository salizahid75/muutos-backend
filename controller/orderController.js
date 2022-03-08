'use strict';

const firebase = require('../db');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addOrder = async (req, res, next) => {

    try {

        const data = {
            user:req.body.user,
            orderFor:req.body.orderFor,
            orderDetails:req.body.orderDetails?req.body.orderDetails:'',
            products:req.body.products?req.body.products:'',
            quantity:req.body.quantity?req.body.quantity:'',
            unitPrices:req.body.unitPrices?req.body.unitPrices:'',
            orderTotal:req.body.orderTotal?req.body.orderTotal:'',
            orderStatus:req.body.orderStatus
        };
        console.log('data:' + JSON.stringify(data))
        await firestore.collection('orders').add(data);
        res.send({ status: "active", data: 'Order added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllOrder = async (req, res, next) => {
    try {
        const orderDB = await firestore.collection('orders');
        await orderDB.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
               tempDoc.push({ id: doc.id, ...doc.data() })
            })
            res.status(200).send({ status: "active", data: tempDoc });
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

const getOrder = async (req, res, next) => {
    try {
        const id = req.body.id;
        const staffDB = await firestore.collection('orders').doc(id).get().then(snapshot => { 
            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Order with Id not exit' });
            }
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: "Order is not defined " });
    }
}

const getOrdersByUserId = async (req, res, next) => {
    try {
        const orderDB = await firestore.collection('orders').where("user", "==", req.body.user).where("orderFor", "==", req.body.orderFor);
        await orderDB.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
               tempDoc.push({ id: doc.id, ...doc.data() })
            })
            res.status(200).send({ status: "active", data: tempDoc });
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

const updateOrder = async (req, res, next) => {
    try {

        const data = {
            id:req.body.id,
            user:req.body.user,
            orderFor:req.body.orderFor,
            specialists:req.body.specialists?req.body.specialists:'',
            services:req.body.services?req.body.services:'',
            slots:req.body.slots?req.body.slots:'',
            plans:req.body.plans?req.body.plans:'',
            dates:req.body.dates?req.body.dates:'',
            products:req.body.products?req.body.products:'',
            quantity:req.body.quantity?req.body.quantity:'',
            unitPrices:req.body.unitPrices?req.body.unitPrices:'',
            orderTotal:req.body.orderTotal?req.body.orderTotal:'',
            orderStatus:req.body.orderStatus
        };
        
        await firestore.collection('orders').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

// "orderFor":"products",
//     "user":"o4OVHUMSJVlOX6dSiNeh",
//     "products":"['1', '2', '4']",
//     "quantity":"['1', '2', '4']",
//     "unitPrices":"['1', '2', '4']",
//     "orderTotal":"1000",
//     "orderStatus":"0"

const deleteOrder = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('orders').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Order deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Order Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


module.exports = {
    addOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
}