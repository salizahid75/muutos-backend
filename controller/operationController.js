'use strict';

const firebase = require('../db');
// const Announcement = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const updateOperations = async (req, res, next) => {
    
    try {
        console.log(req.body);
        const {
            vendorId,
            operationStatus,
            address,
            googleMapLocation,
            phoneNumber,
            staffWorkers,
            userCapacity,
            specialistForUser,
        } = req.body;

        const data = {
            vendorId:vendorId,
            operationStatus:operationStatus,
            address:address,
            googleMapLocation:googleMapLocation,
            phoneNumber:phoneNumber,
            staffWorkers:staffWorkers,
            userCapacity:userCapacity,
            specialistForUser:specialistForUser,
        };


        var getOperations = await firestore.collection('operations').where("vendorId", "==", vendorId);
        await getOperations.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
            })

            if(tempDoc.length>0){
                firestore.collection('operations').where("vendorId", "==", vendorId).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        const update = doc.ref.update(data)
                        if(update){
                            res.send({ status: "active", data: tempDoc })
                        }
                    });
               })
            }else{
                firestore.collection('operations').add(data);
                res.send({ status: "active", data: 'Operations Updated' })
            }
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


const getOperations = async (req, res, next) => {
    try {
        const staffDB = await firestore.collection('operations').where("vendorId", "==", req.body.vendorId);
        await staffDB.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
            })
            res.status(200).send({ status: "active", data: tempDoc[0] });
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

// const getAnnouncement = async (req, res, next) => {
//     try {
//         const id = req.body.id;
//         const staffDB = await firestore.collection('announcements').doc(id).get().then(snapshot => { 
//             if(snapshot.data()!==null && snapshot.data()!==undefined){
//                 res.send({ status: "active", "data": snapshot.data()})
//             }else{
//                 res.status(404).send({ status: "inactive", message: 'Announcement with Id not exit' });
//             }
//         });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", data: "Announcement is not defined " });
//     }
// }

// const updateAnnouncement = async (req, res, next) => {
//     try {
//         const {
//             id, 
//             title,
//             description
//         } = req.body;

//         const data = {
//             id:id,
//             title:title,
//             description:description
//         };

//         await firestore.collection('announcements').doc(id).update(data).then(async() => {
//             console.log("Document Updated successfully");
//             res.send({ status: "active", data: data })
//         })
//     } catch (error) {
//         res.status(400).send({ status: "inactive", "data": error.message });
//     }
// }

// const deleteAnnouncement = async (req, res, next) => {
//     try {
//         const id = req.body.id;
//         await firestore.collection('announcements').doc(id).delete().then(async() => {
//             res.send({ status: "active", "data": 'Announcement deleted successfully' });
//         }).catch(function(error) {
//             res.send({ status: "inactive", "data": 'Announcement Not Deleted' });
//         });
//     } catch (error) {
//         res.status(400).send({ status: "inactive", "data": error.message });
//     }
// }

module.exports = {
    updateOperations,
    getOperations,
    // getAnnouncement,
    // updateAnnouncement,
    // deleteAnnouncement
}