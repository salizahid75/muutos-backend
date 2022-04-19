'use strict';

const firebase = require('../db');
// const Services = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addCategory = async (req, res, next) => {

    try {

        const { 
            categoryName,
            categoryStatus,
            categoryFor,
        } = req.body;

        const data = {
            categoryName:categoryName,
            categoryStatus:categoryStatus,
            categoryFor:categoryFor,
            isActive:1,
            isDeleted:0
        };

        await firestore.collection('categories').add(data);

        res.send({ status: "active", data: 'Category added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllCategories = async (req, res, next) => {
    try {
        const serviceDB = await firestore.collection('categories');
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
        const serviceDB = await firestore.collection('categories').doc(id).get().then(snapshot => { 
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
            categoryName,
            categoryStatus,
            categoryFor
        } = req.body;

        const data = {
            categoryName:categoryName,
            categoryStatus:categoryStatus,
            categoryFor:categoryFor,
        };
        var id = req.body.id;
        await firestore.collection('categories').doc(id).update(data).then(async() => {
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
        await firestore.collection('categories').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Category deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Category Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


const addSubCategory = async (req, res, next) => {
    try {

        const { 
            categoryId,
            subCategoryName,
        } = req.body;

        const data = {
            categoryId:categoryId,
            subCategoryName:subCategoryName,
            isActive:1,
            isDeleted:0
        };

        const createSubCategory = await firestore.collection('sub-categories').add(data);

        if(createSubCategory){
            console.log(createSubCategory.id);
            res.send({ status: "active", data: 'Category added successfully.', id:createSubCategory.id })
        }

    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}
const getSubCategoriesByCategoryId = async (req, res, next) => {
    try {
        const serviceDB = await firestore.collection('sub-categories').where("categoryId", "==", req.body.categoryId);
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

const getProductCategories = async (req, res, next) => {
    try {
        const productCategories = await firestore.collection('categories').where('categoryFor', '==', 'product');
        await productCategories.get().then((querySnapshot)=>{
            const tempDoc = [];
            querySnapshot.forEach((doc)=>{
                tempDoc.push({id:doc.id, ...doc.data()});
            })
            res.status(200).send({status:"active", data:tempDoc});
        })
    } catch (error) {
        res.status(400).send({status:'inactive', data:error.message})
    }
}

const getServiceCategories = async (req, res, next) => {

    try {
        const serviceCategories = await firestore.collection('categories').where('categoryFor', '==', 'service');
        await serviceCategories.get().then((querySnapshot)=>{
            const tempDoc = [];
            querySnapshot.forEach((doc)=>{
                tempDoc.push({id:doc.id, ...doc.data()});
            })
            res.status(200).send({status:"active", data:tempDoc});
        })
    } catch (error) {
        res.status(400).send({status:'inactive', data: error.message})
    }

}

const deleteSubCategoryById = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('sub-categories').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Category deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Category Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const updateCategoryFieldById = async (req, res, next) => {
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
        const {key, value, id} = req.body
        await firestore
            .collection("categories")
            .doc(id)
            .update({"categoryStatus": value})
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    addSubCategory,
    getSubCategoriesByCategoryId,
    deleteSubCategoryById,
    updateCategoryFieldById,
    getProductCategories,
    getServiceCategories,
}