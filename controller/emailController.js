'use strict';

const firebase = require('../db');
const Email = require('../models/emailSender');
const firestore = firebase.firestore();
const nodemailer = require('nodemailer');
// declare vars,
let fromMail = 'muutos.me@gmail.com';
let pass = 'Testing@321';
var otpReceived;
let timerStatus = true;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail,
        pass: pass
    }
});


const welcomeEmailUser = async (req, res, next) => {
    try {
        const data = req.body;
        const emailTo = data.emailTo;
        const subject = "Welcome to muutos.me";
        const body = "you are successfully registered with muutos.me";

        // send email
        let mailOptions = {
            from: fromMail,
            to: emailTo,
            subject: subject,
            text: body
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                res.status(400).send({ status: "inactive", "data": error.message });
            }
            res.send({ status: "active", "data": response });
            console.log(response);

        });
    }
    catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }

}

const forgetOtpUser = async (req, res, next) => {
    try {
        const data = req.body;
        const emailTo = data.emailTo;
        const subject = "OTP from muutos.me";
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        var message = "you are successfully registered with muutos.me your otp is #" + val + " please do not share your otp with anyone.";
        console.log(message);
        const body = message;

        // send email
        let mailOptions = {
            from: fromMail,
            to: emailTo,
            subject: subject,
            text: body
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                res.status(400).send({ status: "inactive", "data": error.message });
            }
            else {
                setTimeout(function () {
                    otpReceived = "";
                    timerStatus = false;
                    console.log("otp deleted");
                }, 210000);
                res.send({ status: "active", "data": response, "message": "OTP will be deleted after 3 min." });
                otpReceived = val;
                console.log(response);
                console.log("otp:" + otpReceived);
            }
        });

    }
    catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}


const forgetOtpVendor = async (req, res, next) => {
    try {
        const data = req.body;
        const emailTo = data.emailTo;
        const subject = "OTP from muutos.me";
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        var message = "you are successfully registered with muutos.me your otp is #" + val + " please do not share your otp with anyone, OTP will be deleted after 3 min.";
        console.log(message);
        const body = message;

        // send email
        let mailOptions = {
            from: fromMail,
            to: emailTo,
            subject: subject,
            text: body
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                res.status(400).send({ status: "inactive", "data": error.message });
            }
            else {
                setTimeout(function () {
                    otpReceived = "";
                    timerStatus = false;
                    console.log("otp deleted");
                }, 210000);
                res.send({ status: "active", "data": response, "message": "OTP will be deleted after 3 min." });
                otpReceived = val;
                console.log(response);
            }
        });
    }
    catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

const checkOTP = async (req, res, next) => {
    try {
        if (timerStatus == true) {
            const data = req.body;
            const otp = data.OTP;
            console.log(otp);
            if (otp == otpReceived) {
                res.send({ status: "active", "data": "OTP VERIFIED", "message": "OTP is active" });
            }
            else {
                res.send({ status: "inactive", "data": "In-correct OTP" });
            }
        }
        else {
            res.send({ status: "inactive", "data": "OTP expired" });
        }

    } catch (error) {
        res.status(400).send({ status: "inactive", "data": error.message });
    }
}

module.exports = {
    welcomeEmailUser,
    forgetOtpUser,
    forgetOtpVendor,
    checkOTP
}



