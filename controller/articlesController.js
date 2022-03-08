'use strict';

const firebase = require('../db');
const product = require('../models/products');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addArticle = async (req, res, next) => {

    try {
        const rawData = req.body;
        const file = req.files;
        const { 
            title,
            subtitle,
            description,
            images
        } = req.body;
        const data = {
            title:title,
            subtitle:subtitle,
            description:description,
            images:images,
            isFeatured:0
        }
        console.log('data:' + JSON.stringify(data))
        await firestore.collection('articles').add(data);
        res.send({ status: "active", data: 'Article added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllArticles = async (req, res, next) => {
    try {
        const productDB = await firestore.collection('articles');
        await productDB.get().then((querySnapshot) => {
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

const getArticle = async (req, res, next) => {
    try {
        const id = req.body.id;
        const product = await firestore.collection('articles').doc(id).get().then(snapshot => {

            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Article with Id not exit' });
            }

        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const updateArticle = async (req, res, next) => {
    try {
        const { 
            id,
            title,
            subtitle,
            description,
            images
        } = req.body;
        const data = {
            id:id,
            title:title,
            subtitle:subtitle,
            description:description,
            images:images
        }
        
        await firestore.collection('articles').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('articles').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Article deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Article Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


const getFeaturedArticles = async (req, res) => {
    try {
        const productDB = await firestore.collection('articles').where('isFeatured','==', 1);
        await productDB.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
               tempDoc.push({ id: doc.id, ...doc.data() })
            })
            res.status(200).send({ status: "active", data: tempDoc });
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const addToFeaturedArticles = async (req, res) => {
    try {
        const { id } = req.body;
        const data = {
            id:id,
            isFeatured:1,
        };
        
        await firestore.collection('articles').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const removeFromFeaturedArticles = async (req, res) => {
    try {
        const { id } = req.body;
        const data = {
            id:id,
            isFeatured:0,
        };
        
        await firestore.collection('articles').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

module.exports = {
    addArticle,
    getAllArticles,
    getArticle,
    updateArticle,
    deleteArticle,
    getFeaturedArticles,
    addToFeaturedArticles,
    removeFromFeaturedArticles,
}