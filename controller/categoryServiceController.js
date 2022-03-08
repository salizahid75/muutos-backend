'use strict';

const firebase = require('../db');
// const Services = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addCategory = async (req, res, next) => {

    try {

        const rawData = req.body;
        const { 
            serviceIcon,
            serviceTitle
        } = req.body;

        const data = {
            serviceTitle:serviceTitle,
            serviceIcon:serviceIcon
        };

        await firestore.collection('serviceCategories').add(data);

        res.send({ status: "active", data: 'Category added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllCategories = async (req, res, next) => {
    try {
        const serviceDB = await firestore.collection('serviceCategories');
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

const getCategory = async (req, res, next) => {
    try {
        const id = req.body.id;
        const serviceDB = await firestore.collection('serviceCategories').doc(id).get().then(snapshot => { 
            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Category with Id not exit' });
            }
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: "Category is not defined " });
    }
}



const updateCategory = async (req, res, next) => {
    try {
        
        const { 
            serviceIcon,
            serviceTitle
        } = req.body;

        const data = {
            serviceTitle:serviceTitle,
            serviceIcon:serviceIcon
        };
        
        await firestore.collection('serviceCategories').doc(id).update(data).then(async() => {
            console.log("Category Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('serviceCategories').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Category deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Category Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}