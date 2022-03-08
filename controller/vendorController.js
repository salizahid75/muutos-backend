'use strict';

const firebase = require('../db');
const Vendor = require('../models/vendor');
const firestore = firebase.firestore();


const addVendor = async (req, res, next) => {
    try {
        const data = req.body;
        let date_ob = new Date();
        // current hours
        let hours = date_ob.getHours();
        // current minutes
        let minutes = date_ob.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var currentTime = hours + ':' + minutes + ' ' + ampm;

        data["featured"] = "no";
        data["location"] = "lat.long"
        data["open_time"] = currentTime;
        data["close_time"] = currentTime;
        data["star_rating"] = '0';
        data["plan"] = "none"
        const vendor = await firestore.collection('vendors').doc().set(data);
        res.send({ status: "active", data: 'Vendor added successfully.' })
    }
    catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}


const getAllVendors = async (req, res, next) => {
    try {
        const vendors = await firestore.collection('vendors');
        const data = await vendors.get();
        const vendorsArray = [];
        if (data.empty) {
            res.status(404).send({ status: "inactive", data: 'No vendors found' });
        }
        else {
            data.forEach(doc => {
                const vendor = new Vendor(
                    doc.id,
                    doc.data().service_id,
                    doc.data().first_name,
                    doc.data().last_name,
                    doc.data().email,
                    doc.data().password,
                    doc.data().phone,
                    doc.data().business_name,
                    doc.data().selected_country,
                    doc.data().city,
                    doc.data().business_address,
                    doc.data().postal_code,
                    doc.data().location,
                    doc.data().open_time,
                    doc.data().close_time,
                    doc.data().star_rating,
                    doc.data().plan,
                    doc.data().bool_customer,
                    doc.data().vendor_type,
                    doc.data().featured,
                    doc.data().how_did_you_know,
                    doc.data().size_of_business,
                    doc.data().size_of_staff,
                    doc.data().facility,
                    doc.data().category
                );
                vendorsArray.push(vendor);
            });
            res.send({ status: "active", data: vendorsArray });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

const getVendor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const vendor = await firestore.collection('vendors').doc(id);
        const data = await vendor.get();
        if (!data.exists) {
            res.status(404).send({ status: "inactive", message: 'Vendor with Id not exit' });
        }
        else {
            res.send({ status: "active", "data": data.data() });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const updateVendor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const vendor = await firestore.collection('vendors').doc(id);
        await vendor.update(data);
        res.send({ status: "active", "data": 'vendor updated successfully' });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const deleteVendor = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('vendors').doc(id).delete();
        res.send({ status: "active", "data": 'vendor deleted successfully' });
    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const getFeaturedVendors = async (req, res, next) => {
    try {
        const vendors = await firestore.collection('vendors').where('featured', '==', 'yes');
        const data = await vendors.get();
        const vendorsArray = [];
        if (data.empty) {
            res.status(404).send({ status: "inactive", data: 'No vendors found' });
        }
        else {
            data.forEach(doc => {
                const vendor = new Vendor(
                    doc.id,
                    doc.data().service_id,
                    doc.data().first_name,
                    doc.data().last_name,
                    doc.data().email,
                    doc.data().password,
                    doc.data().phone,
                    doc.data().business_name,
                    doc.data().selected_country,
                    doc.data().city,
                    doc.data().business_address,
                    doc.data().postal_code,
                    doc.data().location,
                    doc.data().open_time,
                    doc.data().close_time,
                    doc.data().star_rating,
                    doc.data().plan,
                    doc.data().bool_customer,
                    doc.data().vendor_type,
                    doc.data().featured,
                    doc.data().how_did_you_know,
                    doc.data().size_of_business,
                    doc.data().size_of_staff,
                    doc.data().facility,
                    doc.data().category
                );
                vendorsArray.push(vendor);
            });
            res.send({ status: "active", data: vendorsArray });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }

}

module.exports = {
    addVendor,
    getAllVendors,
    getVendor,
    updateVendor,
    deleteVendor,
    getFeaturedVendors
}