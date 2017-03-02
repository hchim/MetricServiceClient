const endpoint = "http://metricsservice.hch.im/metrics";

var request = require('request');
var os = require('os')

var tag_map = {};

module.exports = {
    increaseCounter: function(tag, callback) {
        var formData = {
            tag: tag,
            type: 'count',
            count: 1,
            hostname: os.hostname()
        };

        request.post({
            url: endpoint, form: formData,
            headers: {
                'is-internal-request': 'YES'
            }
        }, function (err, res, body){
            if (err) {
                return callback(err, null);
            }

            var json = JSON.parse(body);
            callback(null, json);
        });
    },
    errorMetric: function(tag, err, callback) {
        if (typeof err == 'object') {
            err = JSON.stringify(err);
        }

        var formData = {
            tag: tag,
            type: 'error',
            error: err,
            hostname: os.hostname()
        };
        request.post({
            url: endpoint, form: formData,
            headers: {
                'is-internal-request': 'YES'
            }
        }, function (err, res, body){
            if (err) {
                return call(err, null);
            }

            var json = JSON.parse(body);
            callback(null, json);
        });
    },
    messageMetric: function(tag, msg, callback) {
        if (typeof msg == 'object') {
            msg = JSON.stringify(msg);
        }

        var formData = {
            tag: tag,
            type: 'msg',
            error: msg,
            hostname: os.hostname()
        };
        request.post({
            url: endpoint, form: formData,
            headers: {
                'is-internal-request': 'YES'
            }
        }, function (err, res, body){
            if (err) {
                return callback(err, null);
            }

            var json = JSON.parse(body);
            callback(null, json);
        });
    },
    startTimeMetric: function (tag) {
        tag_map[tag] = new Date();
    },
    stopTimeMetric: function (tag, callback) {
        var time = new Date() - tag_map[tag];
        var formData = {
            tag: tag,
            type: 'time',
            time: time,
            hostname: os.hostname()
        };
        console.log(formData)
        request.post({
            url: endpoint, form: formData,
            headers: {
                'is-internal-request': 'YES'
            }
        }, function (err, res, body){
            if (err) {
                return callback(err, null);
            }

            var json = JSON.parse(body);
            callback(null, json);
        });
    }
};