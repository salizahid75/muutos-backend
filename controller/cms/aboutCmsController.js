"use strict";
const firebase = require("../../db");
const firestore = firebase.firestore();


const updateAboutContent = async (req, res, next) => {
    try {
        const data = req.body;
        const aboutContent = await firestore.collection("about-us-content").doc('CN7x6FCvtaiehUaZqed4');
        await aboutContent.update(data);
        res.send({ status: "active", data: "Content updated successfully" });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};


const resetAboutContent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = {
            pageTitle:'About Us',
            paragraphOne:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            paragraphTwo:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            paragraphThree:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            paragraphFour:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit ut fermentum, viverra ullamcorper. Est a, convallis sit volutpat fames neque, vulputate porta.Sed maecenas pharetra pellentesque dignissim sed duis arcu, congue. Nisi, nisl eleifend vulputate morbi urna. Sodales non interdum neque dolor sit imperdiet gravida. Curabitur dui sodales lacus, eleifend pharetra, mi venenatis sed.Ipsum leo ut diam ultrices. Non adipiscing turpis aenean orci ac. Nunc lorem elementum dis placerat ut sed.',
            statOneTitle:'Statistics Tile',
            statOneValue:'123',
            statTwoTitle:'Statistics Tile',
            statTwoValue:'123',
            statThreeTitle:'Statistics Tile',
            statThreeValue:'123',
            statFourTitle:'Statistics Tile',
            statFourValue:'123',
            aboutTitleImage:'about.png',
        };
        const aboutContent = await firestore.collection("about-us-content").doc('CN7x6FCvtaiehUaZqed4').update(data);
        if(aboutContent){
            res.send({ status: "active", data: "Content Reset successfully" });
        }
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
};

const updateAboutTitleImage = async (req, res) => {
    try {
        var file = req.file;
        res.status(200).send({ status: "active", img: file.filename });
    } catch (error) {
        res.status(400).send({ status: "inactive", data: error.message });
    }
}

const getAboutContent = async (req, res) => {
    try {
        const aboutContent = await firestore.collection("about-us-content").doc('CN7x6FCvtaiehUaZqed4').get().then(snapshot => {

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
    resetAboutContent,
    updateAboutContent,
    updateAboutTitleImage,
    getAboutContent
};
