'use strict';

const firebase = require('../db');
// const Services = require('../models/Servicess');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();
const { uuid } = require('uuidv4');

const addService = async (req, res, next) => {
    try {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var data;
        if(req.body.userEmail!==undefined){
            const users = await firestore.collection("users").where("email", "==", req.body.userEmail);
            const user = await users.get();
            var userId
            user.forEach(doc=>{
                userId = doc.id;
            })
            data = {
                userEmail: req.body.userEmail ? req.body.userEmail : '',
                language: req.body.language ? req.body.language : '',
                status: req.body.status ? req.body.status : '',
                images: req.body.images ? req.body.images : '',
                name: req.body.name ? req.body.name : '',
                address: req.body.address ? req.body.address : '',
                serviceType: req.body.serviceType ? req.body.serviceType : '',
                audiences: req.body.audiences ? req.body.audiences : '',
                staffWorkers: req.body.staffWorkers ? req.body.staffWorkers : '',
                userCapacity: req.body.userCapacity ? req.body.userCapacity : '',
                specialistsPerUser: req.body.specialistsPerUser ? req.body.specialistsPerUser : '',
                servicesOffered: req.body.servicesOffered ? req.body.servicesOffered : '',
                memberships: req.body.memberships ? req.body.memberships : '',
                specialists: req.body.specialists ? req.body.specialists : '',
                facilities: req.body.facilities ? req.body.facilities : '',
                additionalServices: req.body.additionalServices ? req.body.additionalServices : '',
                aboutSpot: req.body.aboutSpot ? req.body.aboutSpot : '',
                serviceCode: req.body.serviceCode ? req.body.serviceCode : '',
                workingHours: req.body.workingHours ? req.body.workingHours : '',
                specialistsSchedule: req.body.specialistsSchedule ? req.body.specialistsSchedule : '',
                price: req.body.price ? req.body.price : '',
                specialistImages: req.body.specialistImages ? req.body.specialistImages : '',
                specialistCeritificate: req.body.specialistCeritificate ? req.body.specialistCeritificate : '',
                userId: userId ? userId : '',
                isFeatured: 0,
                isApproved: false,
                addedOn: date,
                updatedOn: dateTime,
            };
        }else{
            data = {
                language: req.body.language ? req.body.language : '',
                status: req.body.status ? req.body.status : '',
                images: req.body.images ? req.body.images : '',
                name: req.body.name ? req.body.name : '',
                address: req.body.address ? req.body.address : '',
                serviceType: req.body.serviceType ? req.body.serviceType : '',
                audiences: req.body.audiences ? req.body.audiences : '',
                staffWorkers: req.body.staffWorkers ? req.body.staffWorkers : '',
                userCapacity: req.body.userCapacity ? req.body.userCapacity : '',
                specialistsPerUser: req.body.specialistsPerUser ? req.body.specialistsPerUser : '',
                servicesOffered: req.body.servicesOffered ? req.body.servicesOffered : '',
                memberships: req.body.memberships ? req.body.memberships : '',
                specialists: req.body.specialists ? req.body.specialists : '',
                facilities: req.body.facilities ? req.body.facilities : '',
                additionalServices: req.body.additionalServices ? req.body.additionalServices : '',
                aboutSpot: req.body.aboutSpot ? req.body.aboutSpot : '',
                serviceCode: req.body.serviceCode ? req.body.serviceCode : '',
                workingHours: req.body.workingHours ? req.body.workingHours : '',
                specialistsSchedule: req.body.specialistsSchedule ? req.body.specialistsSchedule : '',
                price: req.body.price ? req.body.price : '',
                specialistImages: req.body.specialistImages ? req.body.specialistImages : '',
                specialistCeritificate: req.body.specialistCeritificate ? req.body.specialistCeritificate : '',
                isFeatured: 0,
                isApproved: false,
                addedOn: date,
                updatedOn: dateTime,
            };
        }
        console.log('data:' + JSON.stringify(data))
        await firestore.collection('services').add(data);
        res.send({ status: "active", data: 'Service added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const getAllServices = async (req, res, next) => {
    try {
        let serviceDB = {};
        if (req?.query?.isFeatured) {
            if (req.query.search) {
                serviceDB = await firestore.collection('services')
                    .where('isFeatured', '==', 1)
                    .where('name', '>=', req.query.search)
                    .where('name', '<=', req.query.search + '\uf8ff');
            }
            if (req.query.filter) {
                switch (req?.query?.filter) {
                    case 'new':
                        serviceDB = await firestore.collection('services').where('isFeatured', '==', 1).orderBy("addedOn", 'desc');
                        break;
                    case 'old':
                        serviceDB = await firestore.collection('services').where('isFeatured', '==', 1).orderBy("addedOn", 'asc');
                        break;

                    default:
                        serviceDB = await firestore.collection('services').where('isFeatured', '==', 1);
                        break;
                }
            } else {
                serviceDB = await firestore.collection('services').where('isFeatured', '==', 1);
            }
        } else if (req?.query?.search) {
            serviceDB = await firestore.collection('services').where('name', '>=', req.query.search).where('name', '<=', req.query.search + '\uf8ff');

        } else if (req?.query?.filter) {
            switch (req?.query?.filter) {
                case 'new':
                    serviceDB = await firestore.collection('services').orderBy("addedOn", 'desc');
                    break;
                case 'old':
                    serviceDB = await firestore.collection('services').orderBy("addedOn", 'asc');
                    break;

                default:
                    serviceDB = await firestore.collection('services');
                    break;
            }
        } else {
            serviceDB = await firestore.collection('services');
        }
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

const updateServiceById = async (req, res, next) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    try {
        const { id, key, value } = req.body;
        await firestore.collection('services').doc(id).update({ [key]: value, updatedOn: dateTime }).then(async () => {
            console.log("Document Updated successfully");
            res.send({ status: "active" })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const getService = async (req, res, next) => {
    try {
        const id = req.body.id;
        const serviceDB = await firestore.collection('services').doc(id).get().then(snapshot => {
            if (snapshot.data() !== null && snapshot.data() !== undefined) {
                res.send({ status: "active", "data": snapshot.data() })
            } else {
                res.status(404).send({ status: "inactive", message: 'Service with Id not exit' });
            }
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: "Service is not defined " });
    }
}

const updateService = async (req, res, next) => {
    const { id } = req.body;
    try {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const data = {
            id: id,
            language: req.body.language ? req.body.language : '',
            status: req.body.status ? req.body.status : '',
            images: req.body.images ? req.body.images : '',
            name: req.body.name ? req.body.name : '',
            address: req.body.address ? req.body.address : '',
            serviceType: req.body.serviceType ? req.body.serviceType : '',
            audiences: req.body.audiences ? req.body.audiences : '',
            staffWorkers: req.body.staffWorkers ? req.body.staffWorkers : '',
            userCapacity: req.body.userCapacity ? req.body.userCapacity : '',
            specialistsPerUser: req.body.specialistsPerUser ? req.body.specialistsPerUser : '',
            servicesOffered: req.body.servicesOffered ? req.body.servicesOffered : '',
            memberships: req.body.memberships ? req.body.memberships : '',
            specialists: req.body.specialists ? req.body.specialists : '',
            facilities: req.body.facilities ? req.body.facilities : '',
            additionalServices: req.body.additionalServices ? req.body.additionalServices : '',
            aboutSpot: req.body.aboutSpot ? req.body.aboutSpot : '',
            serviceCode: req.body.serviceCode ? req.body.serviceCode : '',
            workingHours: req.body.workingHours ? req.body.workingHours : '',
            specialistsSchedule: req.body.specialistsSchedule ? req.body.specialistsSchedule : '',
            price: req.body.price ? req.body.price : '',
            specialistImages: req.body.specialistImages ? req.body.specialistImages : '',
            specialistCeritificate: req.body.specialistCeritificate ? req.body.specialistCeritificate : '',
            updatedOn: dateTime
        };

        await firestore.collection('services').doc(id).update(data).then(async () => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteService = async (req, res, next) => {
    try {
        const id = req.body.id;
        await firestore.collection('services').doc(id).delete().then(async () => {
            res.send({ status: "active", "data": 'Service deleted successfully' });
        }).catch(function (error) {
            res.send({ status: "inactive", "data": 'Service Not Deleted' });
        });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const getFeaturedServices = async (req, res) => {
    try {
        const serviceDB = await firestore.collection('services').where('isFeatured', '==', 1);
        await serviceDB.get().then((querySnapshot) => {
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

const addToFeaturedServices = async (req, res) => {
    try {
        const { id } = req.body;
        const data = {
            id: id,
            isFeatured: 1,
        };

        await firestore.collection('services').doc(id).update(data).then(async () => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const removeFromFeaturedServices = async (req, res) => {

    try {
        const { id } = req.body;
        const data = {
            id: id,
            isFeatured: 0,
        };

        await firestore.collection('services').doc(id).update(data).then(async () => {
            console.log("Document Updated successfully");
            res.send({ status: "active", data: data })
        })
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }

}

const getServiceByType = async (req, res) => {
    const { type } = req.body;
    try {
        const serviceDB = await firestore.collection('services').where('serviceType', '==', type);
        await serviceDB.get().then((querySnapshot) => {
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

const getCustomDateServices = async (req, res) => {
    try {
        let serviceDB;
        if (req.body.query == 'daily') {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            serviceDB = await firestore.collection('services').where('addedOn', '==', date);

        } else if (req.body.query == 'monthly') {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1);
            console.log(date)
            serviceDB = await firestore.collection('services').where('addedOn', '>=', date).where('addedOn', '<=', date + '~');
        } else if (req.body.query == 'yearly') {
            var today = new Date();
            var date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var date3 = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            var date2 = date3.getFullYear() + '-' + (date3.getMonth() + 1) + '-' + date3.getDate();
            console.log(date2)
            serviceDB = await firestore.collection('services').where('addedOn', '>=', date2).where('addedOn', '<=', date1 + '~');
        } else if (req.body.query == 'weekly') {
            var today = new Date();
            var date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var date3 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            var date2 = date3.getFullYear() + '-' + (date3.getMonth() + 1) + '-' + date3.getDate();
            serviceDB = await firestore.collection('services').where('addedOn', '>=', date2).where('addedOn', '<=', date1 + '~');
        } else {
            serviceDB = await firestore.collection('services');
        }
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
const updateServiceFieldById = async (req, res, next) => {
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
        const {field, value, id} = req.body
        await firestore
            .collection("services")
            .doc(id)
            .update({'isApproved':value})
            .then(async () => {
                console.log("Document Updated successfully");
                res.send({ status: "active" });
            });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

module.exports = {
    addService,
    getAllServices,
    getService,
    updateService,
    updateServiceById,
    deleteService,
    getFeaturedServices,
    addToFeaturedServices,
    removeFromFeaturedServices,
    getServiceByType,
    getCustomDateServices,
    updateServiceFieldById
}