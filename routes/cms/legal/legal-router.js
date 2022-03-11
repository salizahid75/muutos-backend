const express = require('express');

const { resetLegalContent, updateLegalContent, getLegalContent} = require('../../../controller/cms/legalCmsController');

const router = express.Router();


router.get('/resetLegalContent', resetLegalContent);
router.post('/updateLegalContent', updateLegalContent);
router.get('/getLegalContent', getLegalContent);


module.exports = {
    routes: router
}

