'use strict'
const path = require('path')
const mongo = require(path.join(__dirname, '../db/mongo'))
const nums = '0123456789'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base = `${nums}${lower}${caps}`
const baseSize = 62

function toBabyURL(url, length) {
    return new Promise(function(resolve, reject) {
        let short = ''

        for(let i = 0; i < length; i++) {
            short += base.charAt(((Math.random() * 1000) % baseSize).toFixed(0))
        }
        
        let urls = mongo.db.collection('urls')
        
        urls.count({short: {$regex: '^'+short}}).then(function(count) {
            short += String(count)
            return urls.insertOne({
                short: short,
                url: url,
                createdAt: new Date()
            })
        }).then(function() {
            resolve(short)
        }).catch(function(err) {
            reject(err)    
        })
        return short
    })
}

function toRedirectURL(short) {
    return new Promise(function(resolve, reject) {
        let urls = mongo.db.collection('urls')
        urls.findOne({short: short}).then(function(doc) {
            if(!doc) {
                resolve()
            } else {
                resolve(doc.url)
            }

        }).catch(function(err) {
            reject(err)
        })
    })
} 

module.exports = {
    toBabyURL: toBabyURL,
    toRedirectURL: toRedirectURL
}