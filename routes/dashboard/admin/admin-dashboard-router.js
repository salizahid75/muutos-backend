const express = require('express');
const adminDashboardController = require('../../../controller/dashboard/admin/adminDashboardController');

const router = express.Router();

router.get('/totalRevenue', adminDashboardController.totalRevenue);
router.get('/outStandingRevenue', adminDashboardController.outStandingRevenue);
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
router.get('/approvedProducts', adminDashboardController.approvedProducts);
router.get('/pendingProducts', adminDashboardController.pendingProducts);
router.get('/approvedServices', adminDashboardController.approvedServices);
router.get('/pendingServices', adminDashboardController.pendingServices);
router.get('/totalProducts', adminDashboardController.totalProducts);
router.get('/totalServices', adminDashboardController.totalServices);
router.get('/totalCommunity', adminDashboardController.totalCommunity);
router.get('/totalClients', adminDashboardController.totalClients);
router.get('/totalVendors', adminDashboardController.totalVendors);
router.get('/totalSpecialists', adminDashboardController.totalSpecialists);

module.exports = {
    routes: router
}