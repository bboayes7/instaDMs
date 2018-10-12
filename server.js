// var Client = require('instagram-private-api').V1

// module.exports = function(session){
// 	var user = {
// 		session : session,
// 		getById: function(id){
// 			return new Promise((resolve, reject) => {
// 				Client.Account.getById(user.session, id).then(function(user){
// 					resolve(user.getParams())
// 				})
// 			})
// 		}
// 	}
// }

var request = require('request')
var _ = require('lodash')
var Client = require('instagram-private-api').V1
var device = new Client.Device('user')
var storage = new Client.CookieFileStorage(__dirname + '/cookies/user.json')
var Promise = require('bluebird')

// And go for login
Client.Session.create(device, storage, 'barriesimo', '545137a')
    .then(function (session) {
        storage.getAccountId()
        .then(function (accountId) {
            var feed = new Client.Feed.AccountFollowers(session, accountId);
            // console.log(feed);

            Promise.mapSeries(_.range(0, 2), function () {
                return feed.get();
            })
            .then(function (results) {
                console.log(results);
            })

        })
    })
