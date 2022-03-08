const express = require('express');
const { addVendor, getAllVendors, getVendor, updateVendor, deleteVendor, getFeaturedVendors } = require('../controller/vendorController');

const router = express.Router();

router.post('/vendor', addVendor);
router.get('/vendors', getAllVendors);
router.get('/vendor/:id', getVendor);
router.put('/vendor/:id', updateVendor);
router.delete('/vendor/:id', deleteVendor);
router.get('/featuredVendors',getFeaturedVendors);

module.exports = {
    routes: router
}
