let firebase = require('firebase');
const config = require("../config/firebase.config.json");

// INITs
firebase.initializeApp(config);
const db = firebase.database();

/**
 * gets root data
 */
exports.getAll = () => {
    return db.ref("/").once("value");
}

/**
 * Get chat data for topic
 * @param {string} topic 
 */
exports.getChat = (topic) => {
    return db.ref("/" + topic + "/").once("value");
}