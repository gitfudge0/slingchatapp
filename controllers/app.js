let express = require('express'),
    router = express.Router(),
    fb = require('../models/firebase');

/**
 * Default route handler
 */
router.get('/', (req, res) => {
    res.sendFile(__dirname + "../public" + "/index.html");
})

/**
 * Gets all topics from fb db 
 */
router.get('/getAllTopics', (req, res) => {
    fb.getAll().then(snap => {
        res.send(snap.val())
    }, err => {
        res.send(err)
    })
})

/**
 * Get chat data for particular topic
 */
router.post('/getChatData', (req, res) => {
    fb.getChat(req.body.key).then(data => {
        res.send(data)
    }, err => {
        res.send(err)
    })
})

module.exports = router;