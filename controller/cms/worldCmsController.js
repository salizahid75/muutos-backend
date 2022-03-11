"use strict";
const firebase = require("../../db");
const firestore = firebase.firestore();

const updateWorldContent = async (req, res, next) => {
    try {
        const data = req.body;
        const worldContent = await firestore.collection("world-content").doc('g8bawnBYdR234rzi2FOB');
        await worldContent.update(data);
        res.send({ status: "active", data: "Content updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const resetWorldContent = async (req, res, next) => {
    try {
        const data = {
            toTheWorldText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            toTheWorldImage:'image.png',
            companyCommitmentText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nibh at elementum viverra dui turpis pellentesque et sed. Rutrum at etiam tempor urna. Purus tempus, aliquam massa dolor. Sociis tellus, nulla viverra quis lacus, ut purus mus nunc.Et a semper fringilla mi sem. Nec id turpis odio lectus. Enim pellentesque lorem amet faucibus posuere. Ut porttitor vitae, pulvinar consequat semper eget nullam eget. Fermentum pulvinar adipiscing nisi consequat quam congue cras. Ipsum pharetra fermentum urna tristique egestas amet, cras. Tellus ac ipsum mi nec. Vel, massa nec scelerisque id sit varius.',
            companyCommitmentImage:'image.png',
            csvInitiativeText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nibh at elementum viverra dui turpis pellentesque et sed.',
            csvFirstInitiativeText:'Initiative',
            csvFirstInitiativeImage:'image.png',
            csvSecondInitiativeText:'Initiative',
            csvSecondInitiativeImage:'image.png',
            csvThreeInitiativeText:'Initiative',
            csvThreeInitiativeImage:'image.png',
            recyclingInitiativeText:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nibh at elementum viverra dui turpis pellentesque et sed.',
            recyclingFirstInitiativeText:'Initiative',
            recyclingFirstInitiativeImage:'image.png',
            recyclingSecondInitiativeText:'Initiative',
            recyclingSecondInitiativeImage:'image.png',
            recyclingThreeInitiativeText:'Initiative',
            recyclingThreeInitiativeImage:'image.png',
        };
        await firestore.collection("world-content").doc('g8bawnBYdR234rzi2FOB').update(data);
        res.send({ status: "active", data: "Content Reset successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};


const updateWorldImage = async (req, res) => {
    try {
        var file = req.file;
        res.status(200).send({ status: "active", img: file.filename });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const getWorldContent = async (req, res) => {
    try {
        const worldContent = await firestore.collection("world-content").doc('g8bawnBYdR234rzi2FOB').get().then(snapshot => {
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
    updateWorldContent,
    resetWorldContent,
    getWorldContent,
    updateWorldImage
};
