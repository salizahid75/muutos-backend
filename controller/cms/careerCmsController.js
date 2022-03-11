"use strict";
const firebase = require("../../db");
const firestore = firebase.firestore();

const updateCareerContent = async (req, res, next) => {
    try {
        const data = req.body;
        const careerContent = await firestore.collection("career-content").doc('5OP1V1JPF8JhE0gi4fwm');
        await careerContent.update(data);
        res.send({ status: "active", data: "Content updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const resetCareerContent = async (req, res, next) => {
    try {
        const data = {
            message:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            careerTitleImage:'about.png',
        };
        await firestore.collection("career-content").doc('5OP1V1JPF8JhE0gi4fwm').update(data);
        res.send({ status: "active", data: "Content Reset successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const updateCareerTitleImage = async (req, res) => {
    try {
        var file = req.file;
        res.status(200).send({ status: "active", img: file.filename });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const getCareerContent = async (req, res) => {
    try {
        const aboutContent = await firestore.collection("career-content").doc('5OP1V1JPF8JhE0gi4fwm').get().then(snapshot => {

            if(snapshot.data()!==null && snapshot.data()!==undefined){
                res.send({ status: "active", "data": snapshot.data()})
            }else{
                res.status(404).send({ status: "inactive", message: 'Nothing Found' });
            }

        });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

module.exports = {
    resetCareerContent,
    updateCareerContent,
    updateCareerTitleImage,
    getCareerContent
};
