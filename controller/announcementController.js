'use strict';

const firebase = require('../db');
// const Announcement = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addAnnouncement = async (req, res, next) => {

    try {
        const rawData = req.body;
        
        const {
            title,
            description
        } = req.body;

        const data = {
            title:title,
            description:description
        };
        console.log('data:' + JSON.stringify(data))
        await firestore.collection('announcements').add(data);
        res.send({ status: "active", data: 'Announcement added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllAnnouncements = async (req, res, next) => {
    try {
        const staffDB = await firestore.collection('announcements');
        await staffDB.get().then((querySnapshot) => {
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

const getAnnouncement = async (req, res, next) => {
    try {
        const id = req.body.id;
        const staffDB = await firestore.collection('announcements').doc(id).get().then(snapshot => { 
            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Announcement with Id not exit' });
            }
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: "Announcement is not defined " });
    }
}

const updateAnnouncement = async (req, res, next) => {
    try {
        const {
            id, 
            title,
            description
        } = req.body;

        const data = {
            id:id,
            title:title,
            description:description
        };
        
        await firestore.collection('announcements').doc(id).update(data).then(async() => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteAnnouncement = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('announcements').doc(id).delete().then(async() => {
            res.send({ status: "active", "data": 'Announcement deleted successfully' });
        }).catch(function(error) {
            res.send({ status: "inactive", "data": 'Announcement Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

module.exports = {
    addAnnouncement,
    getAllAnnouncements,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
}