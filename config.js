'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const{
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    BUCKET_URL,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
}=process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: "AIzaSyDeLDjboOy81ORMPEEUmT9hI2k9b1Iqibw",
  authDomain: "bab-ul-ilm-technologies.firebaseapp.com",
  databaseURL: "https://bab-ul-ilm-technologies-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bab-ul-ilm-technologies",
  storageBucket: "bab-ul-ilm-technologies.appspot.com",
  messagingSenderId: "987453700886",
  appId: "1:987453700886:web:782a691ac15bc2896b6e37",
  measurementId: "G-P6RN1KGRNZ"
      }
}
