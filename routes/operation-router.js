const express = require('express');
const { getOperations, updateOperations } = require('../controller/operationController');

const router = express.Router();

router.post('/updateOperations', updateOperations);
router.post('/operations', getOperations);
module.exports = {
    routes: router
}
