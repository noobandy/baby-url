'use strict'
const path = require('path')
const express = require('express')
const urlShortner = require(path.join(__dirname, '../service/urlShortner'))

const router = express.Router()


router.get('/:short', function(req, res) {
    let short = req.params.short

    urlShortner.toRedirectURL(short).then(function(url) {
        if(!url) {
            res.sendStatus(404)
        } else {
            res.redirect(url)
        } 
    }).catch(function(err) {
        console.log(err)
        res.sendStatus(500);
    })
})

module.exports = router