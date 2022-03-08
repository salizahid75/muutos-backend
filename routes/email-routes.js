const express = require('express');
const { welcomeEmailUser,forgetOtpUser,forgetOtpVendor,checkOTP } = require('../controller/emailController');


const router = express.Router();


router.post('/emailUser', welcomeEmailUser);
router.post('/otpUser', forgetOtpUser);
router.post('/otpVendor', forgetOtpVendor);
router.post('/otpVerify', checkOTP);

module.exports = {
    routes: router
}
 