'use strict';

const firebase = require('../db');
const banner = require('../models/banner');
var storage = require('@google-cloud/storage')
const firestore = firebase.firestore();

const addBanner = async (req, res, next) => {

    try {
        // file upload request in form-data
        const rawData = req.body;
        const file = req.file;
        // const filename = file.filename;

        console.log('raw-data:' + JSON.stringify(rawData) + ',\nfile:' + JSON.stringify(req.file))

        const banner_name = rawData.banner_name;
        const imagePath = file.path;
        const uploadPath = "http://localhost:8080/" + imagePath;

        const data = {
            "banner_name": banner_name,
            "image": uploadPath,
        };
        console.log('data:' + JSON.stringify(data));

        await firestore.collection('banners').doc().set(data);
        res.send({ status: "active", data: 'Banner added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllBanners = async (req, res, next) => {
    try {
        const banners = await firestore.collection('banners');
        const data = await banners.get();
        const bannersArray = [];
        if (data.empty) {
            res.status(404).send({ status: "inactive", data: 'No banner found' });
        }
        else {
            data.forEach(doc => {
                const Banner = new banner(
                    doc.id,
                    doc.data().banner_name,
                    doc.data().image,
                );
                bannersArray.push(Banner);
            });
            res.send({ status: "active", data: bannersArray });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

const getBanner = async (req, res, next) => {
    try {
        const id = req.params.id;
        const banner = await firestore.collection('banners').doc(id);
        const data = await banner.get();
        if (!data.exists) {
            res.status(404).send({ status: "inactive", message: 'Banner with Id not exit' });
        }
        else {
            res.send({ status: "active", "data": data.data() });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const updateBanner = async (req, res, next) => {
    try {
        // file update request in form-data
        const file = req.file;

        const id = req.params.id;
        const data = JSON.parse(JSON.stringify(req.body));
        
        if (file == undefined) {
            console.log("file not found ");
            // data is empty or req.body is empty
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                console.log("file not found and name not found");
                res.send({ status: "inactive", "data": 'no data to upload' });
            }
            else {

                console.log("file not found and name found");
                
                console.log(data);
                console.log(req.file);

                const banner = await firestore.collection('banners').doc(id);
                await banner.update(data);
                res.send({ status: "active", "data": 'Banner name updated successfully' });
            }

        } else if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            console.log("name not found");
            res.send({ status: "inactive", "data": 'no data to upload' });
            if (file == undefined) {
                console.log("file not found and name not found");
                res.send({ status: "inactive", "data": 'no data to upload' });
            }
            else {
                console.log("file found and name not found");
                console.log(req.body);
                console.log(req.file);

                const iconPath = file.path;
                const uploadPath = "http://localhost:8080/" + iconPath;
                const newData = { "icon": uploadPath }
                const banner = await firestore.collection('banners').doc(id);
                await banner.update(newData);
                res.send({ status: "active", "data": 'Banner icon updated successfully' });
            }


        } else if (!(req.body.constructor === Object && Object.keys(req.body).length === 0) && !(file == undefined)) {

            console.log("file found and name found");
            console.log(req.body);
            console.log(req.file);

            try {
                // file upload request in form-data
                const rawData = req.body;

                // const filename = file.filename;

                console.log('raw-data:' + JSON.stringify(rawData) + ',\nfile:' + JSON.stringify(req.file))

                const bannerName = rawData.banner_name;
                const iconPath = file.path;
                const uploadPath = "http://localhost:8080/" + iconPath;

                const new_data = {
                    "banner_name": bannerName,
                    "icon": uploadPath,
                };
                console.log('data:' + JSON.stringify(new_data))

                const banner = await firestore.collection('banners').doc(id);
                await banner.update(new_data);
                res.send({ status: "active", data: 'Banner name and icon updated successfully.' })
            }
            catch (error) {
                res.status(400).send({ status: "inactive", data: error.message });
            }
        } else {
            console.log("else");
            console.log(req.body);
            console.log(req.file);

            res.status(400).send({ status: "inactive", data: "error request" });
        }


    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteBanner = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('banners').doc(id).delete();
        res.send({ status: "active", "data": 'Banner deleted successfully' });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

module.exports = {
    addBanner,
    getAllBanners,
    getBanner,
    updateBanner,
    deleteBanner
}