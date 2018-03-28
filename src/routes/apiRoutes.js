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
        let baseURL = process.env.baseURL || "https://noobandy-fcc-challenges.herokuapp.com/" 
        res.json({
            url: url,
            short: `${baseURL}${short}`
        })
    }).catch(function(err) {
        console.log(err)
        res.sendStatus(500);
    })
})

module.exports = router