'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const urlShortner = require(path.join(__dirname, '../service/urlShortner'))

const router = express.Router()

router.use(bodyParser.json())

router.post('/baby-url', function(req, res) {
    let url = req.body.url
    urlShortner.toBabyURL(url, 6).then(function(short) {
        res.json({
            url: url,
            short: `https://node-server-noobandy.c9users.io/${short}`
        })
    }).catch(function(err) {
        console.log(err)
        res.sendStatus(500);
    })
})

module.exports = router