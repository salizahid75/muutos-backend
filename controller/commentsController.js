'use strict';

const firebase = require('../db');
const product = require('../models/products');
var fs = require('fs')
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addComment = async (req, res, next) => {

    try {
        const rawData = req.body;
        const { 
            commentFor,
            itemId,
            stars,
            body, 
            author,
            likes,
        } = req.body;
        const data = {
            commentFor:commentFor,
            itemId:itemId,
            stars:stars,
            body:body, 
            author:author,
            likes:likes,
        }
        console.log(req.body)
        await firestore.collection('comments').add(data);
        res.send({ status: "active", data: 'Comment added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllComments = async (req, res, next) => {
    try {
        const productDB = await firestore.collection('comments');
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

const getItemCommentsById = async (req, res, next) => {
    try {
        
        const itemId = req.body.itemId;
        const commentFor = req.body.commentFor;
        const productDB = await firestore.collection('comments').where('commentFor', '==', commentFor).where('itemId', '==', itemId);
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

const getComment = async (req, res, next) => {
    try {
        const id = req.body.id;
        const product = await firestore.collection('comments').doc(id).get().then(snapshot => {

            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Comment with Id not exit' });
            }

        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const updateComment = async (req, res, next) => {
    try {
        const rawData = req.body;
        const {
            id,
            commentFor,
            itemId, 
            stars,
            body, 
            author,
            likes,
        } = req.body;
        const data = {
            id:id,
            commentFor:commentFor,
            itemId:itemId,
            stars:stars,
            body:body, 
            author:author,
            likes:likes,
        }
        
        await firestore.collection('comments').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('comments').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Comment deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Comment Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


const likeComment = async () => {
    try {
        const id = req.body.id;
        const product = await firestore.collection('comments').doc(id).get().then(snapshot => {

            if(snapshot.data()!==null && snapshot.data()!==undefined){
                const data = snapshot.data();
                let newLikes = parseInt(data.likes)+1;
                const dataSend = {
                    id:id,
                    likes:newLikes,
                }
                firestore.collection('comments').doc(id).update(dataSend).then(async() => {
                    console.log("Document Updated successfully");
                    res.send({ status: "active", data: data })
                })
            }else{
                res.status(404).send({ status: "inactive", message: 'Comment with Id not exit' });
            }

        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}




module.exports = {
    addComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
    getItemCommentsById, 
    likeComment, 
}