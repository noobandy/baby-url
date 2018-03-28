'use strict'

const path = require('path')
const express = require('express')
const db = require(path.join(__dirname, './db/mongo'))
const apiRoutes = require(path.join(__dirname, './routes/apiRoutes'))
const redirectRoutes = require(path.join(__dirname, './routes/redirectRoutes'))
const webAppRoutes = require(path.join(__dirname, './routes/webAppRoutes'))


let port = process.env.PORT || 3000
let connectionString = process.env.mongoStr || "mongodb://127.0.0.1:27017/baby-url"


let app = express()
// app.get('/', function(req, res) {
//     console.log(req)
//     res.end("OK")
// })

app.set('views', path.join(__dirname, "./views"))
app.set('view engine', 'ejs')

app.use('/', redirectRoutes)

app.use('/', webAppRoutes)

app.use('/api', apiRoutes)

db.connect(connectionString, 'baby-url').then(function() {
    console.log(`connected using ${connectionString}`)
    app.listen(port, function() {
        console.log(`server started at ${port}`)
    })
}).catch(function(err) {
    console.log(`failed to connect ${err}`)
})

