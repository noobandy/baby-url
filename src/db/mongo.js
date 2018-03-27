'use strict'
const mongodb = require('mongodb')

module.exports = {
    db: undefined,
    connect: function(connectionString, dbName) {
        let that = this
        return new Promise(function(resolve, reject) {
            if(that.db) {
                process.nextTick(function() {
                    resolve()
                })
            } else {
                mongodb.MongoClient.connect(connectionString, function(err, client) {
                    if(err) {
                        return reject(err)
                    }
                    that.db = client.db(dbName)
                    resolve()
                })
            }
        })
    }
}