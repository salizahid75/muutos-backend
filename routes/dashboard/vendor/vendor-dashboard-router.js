const express = require('express');
const adminDashboardController = require('../../../controller/dashboard/admin/adminDashboardController');


const router = express.Router();


router.get('/totalRevenue', adminDashboardController.totalRevenue);
router.get('/dailyRevenue', adminDashboardController.dailyRevenue);
router.get('/productsDemand', adminDashboardController.productsDemand);
router.get('/servicesDemand', adminDashboardController.servicesDemand);
router.get('/yearlyProductsOrders', adminDashboardController.yearlyProductsOrders);
router.get('/yearlyServicesOrders', adminDashboardController.yearlyServicesOrders);
router.get('/bestProduct', adminDashboardController.bestProduct);
router.get('/bestService', adminDashboardController.bestService);
router.get('/salesByMen', adminDashboardController.salesByMen);
router.get('/salesByWomen', adminDashboardController.salesByWomen);
router.get('/salesByKids', adminDashboardController.salesByKids);
router.get('/worstProduct', adminDashboardController.worstProduct);
router.get('/worstService', adminDashboardController.worstService);


module.exports = {
    routes: router
}

