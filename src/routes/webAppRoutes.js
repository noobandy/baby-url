'use strict'
const express = require('express')

let router = express.Router()

router.get('/', function(req, res) {
    let baseURL = process.env.baseURL || "https://noobandy-fcc-challenges.herokuapp.com/" 
    res.render('index', {baseURL: baseURL})
})

module.exports = router